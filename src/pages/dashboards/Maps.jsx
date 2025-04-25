import React, { useState, useEffect } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { DashboardLayoutContainer } from "../../hoc/DashboardLayoutContainer";
import { request } from '../../api/request';
import '/src/css/Maps.css';

const OrganizationsPanel = ({ city, organizations, onClose, loading }) => {
  const formatNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return (
    <div className="organizations-panel">
      <div className="panel-header">
        <h3>Организации в городе {city}</h3>
        <button onClick={onClose} className="close-btn">
          &times;
        </button>
      </div>
      
      {loading ? (
        <div className="loading-state">Загрузка данных...</div>
      ) : organizations.length > 0 ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Организация</th>
                <th>Публикаций</th>
              </tr>
            </thead>
            <tbody>
              {organizations.map((org, index) => (
                <tr key={index}>
                  <td>{org.organization}</td>
                  <td>{formatNumber(org.publications)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">Нет данных об организациях</div>
      )}
    </div>
  );
};

export const MAPS = () => {
  const [zoom, setZoom] = useState(3);
  const [citiesData, setCitiesData] = useState([]);
  const [organizationsData, setOrganizationsData] = useState([]);
  const [activeCity, setActiveCity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCitiesData = async () => {
      try {
        setLoading(true);
        const data = await request.get('map/city-publications');
        setCitiesData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCitiesData();
  }, []);

  const fetchOrganizations = async (city) => {
    try {
      setLoading(true);
      setActiveCity(city);
      const data = await request.get(`map/city-organizations?city=${encodeURIComponent(city)}`);
      setOrganizationsData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const closeOrganizationsPanel = () => {
    setActiveCity(null);
  };

  const circleSvg = encodeURIComponent(`
    <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="15" r="14" fill="rgba(100,170,255,0.7)" stroke="rgba(30,136,229,0.8)" stroke-width="2"/>
    </svg>
  `);
  const circleUrl = `data:image/svg+xml;utf8,${circleSvg}`;

  return (
    <div className="maps-container">
      <DashboardLayoutContainer>
        <div className="map-wrapper">
          <YMaps query={{ 
            lang: 'ru_RU',
            load: 'package.full'
          }}>
            <Map
              defaultState={{
                center: [55.75, 37.62],
                zoom: zoom,
                controls: ['zoomControl', 'fullscreenControl']
              }}
              width="85vw"
              height="60vh"
              onBoundsChange={(e) => setZoom(e.get('newZoom'))}
            >
              {citiesData.map((city) => (
                <Placemark
                  key={city.city}
                  geometry={[city.lat, city.lon]}
                  options={{
                    iconLayout: 'default#imageWithContent',
                    iconImageHref: circleUrl,
                    iconImageSize: [30, 30],
                    iconImageOffset: [-15, -15],
                    iconContentOffset: [0, 0]
                  }}
                  properties={{
                    iconContent: city.publications,
                    hintContent: `
                      <div class="hint">
                        <div class="hint-value">${city.city}</div>
                        <div class="hint-sum">Публикаций: ${city.publications}</div>
                      </div>
                    `,
                    balloonContent: `
                      <div class="balloon">
                        <h3 class="balloon-title">${city.city}</h3>
                        <div class="balloon-content">
                          <p><span>Координаты:</span> ${city.lat.toFixed(4)}, ${city.lon.toFixed(4)}</p>
                          <p><span>Публикаций:</span> <strong>${city.publications}</strong></p>
                        </div>
                      </div>
                    `
                  }}
                  modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                  onClick={() => fetchOrganizations(city.city)}
                />
              ))}
            </Map>
          </YMaps>
        </div>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        {activeCity && (
          <OrganizationsPanel 
            city={activeCity} 
            organizations={organizationsData} 
            onClose={closeOrganizationsPanel}
            loading={loading}
          />
        )}
      </DashboardLayoutContainer>
    </div>
  );
};