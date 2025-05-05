import React, { useEffect, useRef, useState } from 'react';
// 1) Импортируем CSS из node_modules
import 'leaflet/dist/leaflet.css';
// 2) Импортируем сам Leaflet и плагин heat
import L from 'leaflet';
import 'leaflet.heat';
// 3) API-запросы
import { request } from '../../api/request';
// 4) Общие стили и SVG для кнопки «×»
import '../../css/Maps.scss';
import { CrossSvg } from '../../components/CrossSvg';
import { DashboardLayoutContainer } from '../../hoc/DashboardLayoutContainer';

// Компонент фильтров (копипаст из MAPS)
const Filters = ({ keywords, selectedKeyword, onKeywordChange, onClearKeyword }) => (
    <div className="filters-container">
        <div className="select-filter">
            <label htmlFor="keyword-select">Фильтр по ключевым словам:</label>
            <div className="select-wrapper">
                <select
                    id="keyword-select"
                    value={selectedKeyword}
                    onChange={e => onKeywordChange(e.target.value)}
                    disabled={!keywords.length}
                >
                    <option value="">Все ключевые слова</option>
                    {keywords.map(k => (
                        <option key={k} value={k}>{k}</option>
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

function HeatmapPage() {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const heatRef = useRef(null);

    const [keywordsList, setKeywordsList] = useState([]);
    const [selectedKeyword, setSelectedKeyword] = useState('');
    const [loadingKeywords, setLoadingKeywords] = useState(false);
    const [error, setError] = useState(null);

    // --- 1) Загрузка списка ключевых слов
    useEffect(() => {
        const fetchKeywords = async () => {
            setLoadingKeywords(true);
            try {
                const data = await request.get('statistics/rating/keywords?min_publications=50');
                setKeywordsList(data);
            } catch {
                setError('Ошибка загрузки ключевых слов');
            } finally {
                setLoadingKeywords(false);
            }
        };
        fetchKeywords();
    }, []);

    // --- 2) Инициализация карты + пустого слоя heatmap
    useEffect(() => {
        if (mapRef.current || !mapContainerRef.current) return;

        // создаём карту
        const map = L.map(mapContainerRef.current).setView([55, 50], 3.3);
        mapRef.current = map;
        map.attributionControl.setPrefix(false);

        // тайлы OSM
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        // создаём пустой heatLayer, данные подставим позже
        const heat = L.heatLayer([], {
            radius: 20,
            blur: 12,
            maxZoom: 10,
        }).addTo(map);
        heatRef.current = heat;
    }, []);

    // --- 3) При изменении фильтра (и на старте) — подгружаем точки и обновляем тепловую карту
    useEffect(() => {
        if (!heatRef.current) return;

        const fetchHeatData = async () => {
            try {
                // здесь используем **тот же** эндпоинт, что и в обычном MAPS
                const url = selectedKeyword
                    ? `map/city-publications?keyword=${encodeURIComponent(selectedKeyword)}`
                    : 'map/city-publications';
                const cities = await request.get(url);
                // из { city, lat, lon, publications } формируем [lat, lon, weight]
                const points = cities.map(c => [c.lat, c.lon, c.publications]);
                heatRef.current.setLatLngs(points);
            } catch {
                setError('Ошибка загрузки данных для тепловой карты');
            }
        };

        fetchHeatData();
    }, [selectedKeyword]);

    return (
        <div className="maps-page">
            {/* Фильтры */}
            <div className="filters">
                <Filters
                    keywords={keywordsList}
                    selectedKeyword={selectedKeyword}
                    onKeywordChange={kw => setSelectedKeyword(kw)}
                    onClearKeyword={() => setSelectedKeyword('')}
                />
            </div>

            {/* Заголовок и карта */}
            <DashboardLayoutContainer>
                <div className="map-content">
                    <div className="map-wrapper" style={{ height: '50vh', borderRadius: '8px', overflow: 'hidden' }}>
                        <div
                            ref={mapContainerRef}
                            style={{ width: '100%', height: '100%', background: '#eee' }}
                            />
                    </div>
                </div>

                {/* Ошибки */}
                {error && (
                    <div className="error-message">
                        {error}
                        <button onClick={() => setError(null)}>&times;</button>
                    </div>
                )}
            </DashboardLayoutContainer>
        </div>
    );
}

export default HeatmapPage;
export const HEATMAP = HeatmapPage;