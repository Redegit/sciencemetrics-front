import React, { useState, useEffect } from 'react';
import { YMaps, Map, Placemark } from '@iminside/react-yandex-maps';
import { DashboardLayoutContainer } from "../../hoc/DashboardLayoutContainer";
import { request } from '../../api/request';
import '../../css/Maps.scss';
import { CrossSvg } from '../../components/CrossSvg';

const Filters = ({ keywords, selectedKeyword, onKeywordChange, onClearKeyword }) => {
  return (
    <div className="filters-container">
      <div className="select-filter">
        <label htmlFor="keyword-select">Фильтр по ключевым словам:</label>
        <div className="select-wrapper">
          <select
            id="keyword-select"
            value={selectedKeyword}
            onChange={(e) => onKeywordChange(e.target.value)}
            disabled={!keywords.length}
            >
            <option value="">Все ключевые слова</option>
            {keywords.map((keyword) => (
              <option key={keyword} value={keyword}>
                {keyword}
              </option>
            ))}
          </select>
          {selectedKeyword && (
            <button 
            onClick={onClearKeyword}
            className="clear-filter-btn"
            title="Очистить фильтр"
            >
              <CrossSvg />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export const MAPS = () => {
  const [zoom, setZoom] = useState(3);
  const [citiesData, setCitiesData] = useState([]);
  const [organizationsData, setOrganizationsData] = useState([]);
  const [activeCity, setActiveCity] = useState(null);
  const [loading, setLoading] = useState({
    cities: false,
    orgs: false,
    keywords: false
  });
  const [error, setError] = useState(null);
  const [keywordsList, setKeywordsList] = useState([]);
  const [selectedKeyword, setSelectedKeyword] = useState('');
  

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        setLoading(prev => ({ ...prev, keywords: true }));
        const data = await request.get('statistics/rating/keywords?min_publications=50');
        setKeywordsList(data);
      } catch (err) {
        setError('Ошибка загрузки ключевых слов');
      } finally {
        setLoading(prev => ({ ...prev, keywords: false }));
      }
    };
    fetchKeywords();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchCitiesData = async () => {
        try {
          setLoading(prev => ({ ...prev, cities: true }));
          const url = selectedKeyword 
            ? `map/city-publications?keyword=${encodeURIComponent(selectedKeyword)}`
            : 'map/city-publications';
          const data = await request.get(url);
          setCitiesData(data);
        } catch (err) {
          setError('Ошибка загрузки данных городов');
        } finally {
          setLoading(prev => ({ ...prev, cities: false }));
        }
      };
      fetchCitiesData();
    }, 300);

    return () => clearTimeout(timer);
  }, [selectedKeyword]);

  const fetchOrganizations = async (city) => {
    try {
      setLoading(prev => ({ ...prev, orgs: true }));
      setActiveCity(city);
      const url = selectedKeyword
        ? `map/city-organizations?city=${encodeURIComponent(city)}&keyword=${encodeURIComponent(selectedKeyword)}`
        : `map/city-organizations?city=${encodeURIComponent(city)}`;
      const data = await request.get(url);
      setOrganizationsData(data);
    } catch (err) {
      setError('Ошибка загрузки данных организаций');
    } finally {
      setLoading(prev => ({ ...prev, orgs: false }));
    }
  };

  const formatNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  const circleSvg = encodeURIComponent(`
    <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="15" r="14" fill="rgba(100,170,255,0.7)" stroke="rgba(30,136,229,0.8)" stroke-width="2"/>
    </svg>
  `);
  const circleUrl = `data:image/svg+xml;utf8,${circleSvg}`;

  return (
    <div className="maps-page">
    
      <div className="filters">
        <Filters
          keywords={keywordsList}
          selectedKeyword={selectedKeyword}
          onKeywordChange={(keyword) => {
            setSelectedKeyword(keyword);
            setActiveCity(null);
          }}
          onClearKeyword={() => setSelectedKeyword('')}
        />
      </div>

 
      <DashboardLayoutContainer>
        <div className="map-content">
 
          <div className="map-wrapper">
            <YMaps query={{ lang: 'ru_RU', load: 'package.full' }}>
              <Map
                defaultState={{
                  center: [55.75, 37.62],
                  zoom: zoom,
                  controls: ['zoomControl', 'fullscreenControl']
                }}
                width="100%"
                height="60vh"
                onBoundsChange={(e) => setZoom(e.get('newZoom'))}
              >
                {!loading.cities && citiesData.map((city) => (
                  <Placemark
                    key={`${city.city}-${selectedKeyword || 'all'}`}
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
                          <div class="hint-sum">Публикаций: ${formatNumber(city.publications)}</div>
                          ${selectedKeyword ? `<div class="hint-keyword">Ключевое слово: ${selectedKeyword}</div>` : ''}
                        </div>
                      `,
                      balloonContent: `
                        <div class="balloon">
                          <h3 class="balloon-title">${city.city}</h3>
                          <div class="balloon-content">
                            <p><span>Координаты:</span> ${city.lat.toFixed(4)}, ${city.lon.toFixed(4)}</p>
                            <p><span>Публикаций:</span> <strong>${formatNumber(city.publications)}</strong></p>
                            ${selectedKeyword ? `<p><span>Ключевое слово:</span> <strong>${selectedKeyword}</strong></p>` : ''}
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

          {activeCity && (
            <div className="organizations-panel">
              <div className="panel-header">
                <h3>
                  Организации в городе {activeCity}
                  {selectedKeyword && <span className="select-filter">"> (фильтр: "{selectedKeyword}")</span>}
                </h3>
                <button 
                  onClick={() => setActiveCity(null)}
                  className="close-btn"
                >
                  &times;
                </button>
              </div>
              
              {loading.orgs ? (
                <div className="loading-state">Загрузка данных...</div>
              ) : organizationsData.length > 0 ? (
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Организация</th>
                        <th>Публикаций</th>
                      </tr>
                    </thead>
                    <tbody>
                      {organizationsData.map((org, index) => (
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
          )}
        </div>

        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError(null)}>&times;</button>
          </div>
        )}
      </DashboardLayoutContainer>
    </div>
  );
};