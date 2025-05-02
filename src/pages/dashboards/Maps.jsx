import React, { useState, useEffect } from 'react';
import { YMaps, Map, Placemark } from '@iminside/react-yandex-maps';
import { DashboardLayoutContainer } from "../../hoc/DashboardLayoutContainer";
import { request } from '../../api/request';
import '../../css/Maps.css';

const Filters = ({ keywords, selectedKeyword, onKeywordChange, onClearKeyword }) => {
  return (
    <div className="keyword-filter">
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
            &times;
          </button>
        )}
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

   const calculatePointSize = (publications, maxPublications, currentZoom) => {
    const minSize = 14; 
    const maxSize = 45;  
    const baseZoom = 3; 
    
    const zoomFactor = 1 + Math.pow(currentZoom - baseZoom, 1.3) * 0.15;

    const effectiveMax = Math.min(maxPublications, 
      citiesData.length > 5 ? 
        citiesData.sort((a,b) => b.publications - a.publications)[Math.floor(citiesData.length * 0.1)].publications : 
        maxPublications
    );

    let normalized;
    if (publications <= 100) {
      normalized = Math.pow(publications / 100, 0.7);
    } else {
      normalized = 0.6 * Math.log(publications) / Math.log(effectiveMax);
    }
    return minSize + (maxSize - minSize) * Math.min(1, normalized) * zoomFactor;
  };


  const getEffectiveMax = (data) => {
    if (!data || data.length === 0) return 100;
    
    const sorted = [...data].map(city => city.publications).sort((a, b) => a - b);
    const index = Math.floor(sorted.length * 0.9);
    return sorted[index] || sorted[sorted.length - 1] || 100;
  };

  const calculatePointColor = (publications, effectiveMax) => {
    const position = Math.min(1, Math.sqrt(publications / effectiveMax));
    
    let color;
    if (position < 0.33) {
      const t = position / 0.33;
      color = interpolateColor("#42bbc6", "#2a98bf", t);
    } else if (position < 0.66) {
      const t = (position - 0.33) / 0.33;
      color = interpolateColor("#2a98bf", "#2273b0", t);
    } else {
      const t = (position - 0.66) / 0.34;
      color = interpolateColor("#2273b0", "#284e9d", t);
    }
    
    return color.replace(")", ", 0.72)").replace("rgb", "rgba");
  };
  
  const calculateStrokeColor = (publications, effectiveMax) => {
    const position = Math.min(1, Math.pow(publications / effectiveMax, 0.7));

    let color;
    if (position < 0.33) {
      const t = position / 0.33;
      color = interpolateColor("#369ca6", "#1d84a9", t);
    } else if (position < 0.66) {
      const t = (position - 0.33) / 0.33;
      color = interpolateColor("#1d84a9", "#1a6299", t);
    } else {
      const t = (position - 0.66) / 0.34;
      color = interpolateColor("#1a6299", "#1d3d8c", t);
    }
    
    return color.replace(")", ", 0.92)").replace("rgb", "rgba");
  };

  function interpolateColor(color1, color2, factor) {
    if (arguments.length < 3) { 
      factor = 0.5; 
    }
    
    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);
    
    const r = Math.round(c1.r + factor * (c2.r - c1.r));
    const g = Math.round(c1.g + factor * (c2.g - c1.g));
    const b = Math.round(c1.b + factor * (c2.b - c1.b));
    
    return `rgb(${r}, ${g}, ${b})`;
  }

  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
  
  const createCircleIcon = (publications, effectiveMax, currentZoom) => {
    const size = calculatePointSize(publications, effectiveMax, currentZoom);
    const fontSize = Math.max(8, Math.min(12, size * 0.22));
    
    const fillColor = calculatePointColor(publications, effectiveMax);
    const strokeColor = calculateStrokeColor(publications, effectiveMax);
  
    const svg = `
      <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 1}" 
                fill="${fillColor}" 
                stroke="${strokeColor}" 
                stroke-width="${1.1 + (size / 50)}"/>
        <text x="${size/2}" y="${size/2 + fontSize/3}" 
              text-anchor="middle" 
              font-family="Arial" 
              font-size="${fontSize}px" 
              fill="white" 
              font-weight="bold"
              style="pointer-events: none; text-shadow: 0 0 2px rgba(0,0,0,0.3)">
          ${publications}
        </text>
      </svg>
    `;
    
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  };

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
          {!loading.cities && citiesData.length > 0 && (() => {
            const effectiveMax = getEffectiveMax(citiesData);
            
            return citiesData.map((city) => {
              const iconUrl = createCircleIcon(city.publications, effectiveMax, zoom);
              const size = calculatePointSize(city.publications, effectiveMax, zoom);
              
              return (
                <Placemark
                  key={`${city.city}-${selectedKeyword || 'all'}`}
                  geometry={[city.lat, city.lon]}
                  options={{
                    iconLayout: 'default#image',
                    iconImageHref: iconUrl,
                    iconImageSize: [size, size],
                    iconImageOffset: [-size/2, -size/2]
                  }}
                        properties={{
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
                    );
                  });
                })()}
              </Map>
            </YMaps>
          </div>

          {activeCity && (
            <div className="organizations-panel">
              <div className="panel-header">
                <h3>
                  Организации в городе {activeCity}
                  {selectedKeyword && <span className="keyword-filter"> ключевое слово: {selectedKeyword}</span>}
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