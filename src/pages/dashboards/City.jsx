import { DashboardPageWrapper } from "../../hoc/DashboardPageWrapper";
import React, { useRef, useEffect, useState } from 'react';
import * as echarts from 'echarts';

export const CITY = () => {
  const chartRef = useRef(null);
  const [citiesData, setCitiesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [authorsLoading, setAuthorsLoading] = useState(false);
  const chartInstance = useRef(null);

  // Функции для правильного склонения слов
  const getPublicationsWord = (count) => {
    if (count % 100 >= 11 && count % 100 <= 14) return 'публикаций';
    switch (count % 10) {
      case 1: return 'публикация';
      case 2:
      case 3:
      case 4: return 'публикации';
      default: return 'публикаций';
    }
  };

  const getAuthorsWord = (count) => {
    if (count % 100 >= 11 && count % 100 <= 14) return 'авторов';
    switch (count % 10) {
      case 1: return 'автор';
      case 2:
      case 3:
      case 4: return 'автора';
      default: return 'авторов';
    }
  };

  // Загрузка данных по городам
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://46.8.232.101:5001/api/statistics/authors-by-city?min_publications=100');
        if (!response.ok) throw new Error('Ошибка загрузки данных');
        
        const data = await response.json();
        setCitiesData(data.map(item => ({
          name: item[0],
          value: item[1]
        })));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Загрузка авторов при выборе города
  useEffect(() => {
    if (!selectedCity) {
      setAuthors([]);
      return;
    }

    const fetchAuthors = async () => {
      setAuthorsLoading(true);
      try {
        const response = await fetch(`http://46.8.232.101:5001/api/authors/by-city?city=${encodeURIComponent(selectedCity)}`);
        if (!response.ok) throw new Error('Ошибка загрузки авторов');
        setAuthors(await response.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setAuthorsLoading(false);
      }
    };

    fetchAuthors();
  }, [selectedCity]);

  // Инициализация графика
  useEffect(() => {
    if (!chartRef.current || loading || error || citiesData.length === 0) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    const hueStep = 360 / citiesData.length;
    const colors = citiesData.map((_, i) => `hsl(${(i * hueStep) % 360}, 70%, 60%)`);

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          return `
            <strong>${params.name}</strong><br/>
            Публикаций: ${params.value}
          `;
        }
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 50,
        top: 20,
        bottom: 20,
        textStyle: { 
          color: '#666',
          fontSize: 12
        }
      },
      series: [{
        name: 'Публикации по городам',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['40%', '50%'],
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 2
        },
        label: { 
          show: false
        },
        emphasis: {
          scale: true,
          scaleSize: 5,
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.3)'
          }
        },
        data: citiesData.map((city, index) => ({
          value: city.value,
          name: city.name,
          itemStyle: {
            color: colors[index],
            opacity: selectedCity && selectedCity !== city.name ? 0.3 : 1
          }
        })),
        selectedMode: 'single'
      }]
    };

    chartInstance.current.setOption(option);

    const clickHandler = (params) => {
      if (params.componentType === 'series') {
        setSelectedCity(params.name === selectedCity ? null : params.name);
      }
    };

    chartInstance.current.on('click', clickHandler);
    const handleResize = () => chartInstance.current.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.current.off('click', clickHandler);
    };
  }, [loading, error, citiesData, selectedCity]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </div>
          <p className="mt-2">Загрузка данных...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="alert alert-danger">
          Ошибка: {error}
          <button 
            className="btn btn-sm btn-primary ms-3"
            onClick={() => window.location.reload()}
          >
            Повторить
          </button>
        </div>
      );
    }

    const selectedCityData = citiesData.find(c => c.name === selectedCity);

    return (
      <div className="row g-3">
        {/* Основная диаграмма */}
        <div className="col-lg-8">
          <div className="card h-100">
            <div className="card-body p-0">
              <div 
                ref={chartRef} 
                style={{ 
                  width: '250%', 
                  height: '500px',
                  minHeight: '300px'
                }} 
              />
            </div>
          </div>
        </div>

        {/* Боковая панель с авторами */}
        <div className="col-lg-4">
          <div className="card h-100">
            <div className="card-body">
              <h6 className="card-title d-flex justify-content-between align-items-center mb-3">
                <span className="fw-bold">{selectedCity || 'Выберите город'}</span>
                {selectedCity && (
                  <span className="text-muted small">
                    {authors.length} {getAuthorsWord(authors.length)}
                  </span>
                )}
              </h6>

              <div className="authors-list-container" style={{ 
                maxHeight: '400px', 
                overflowY: 'auto',
                borderTop: '1px solid #eee',
                paddingTop: '1rem', 
                width: '400px', 
              }}>
                {authorsLoading ? (
                  <div className="text-center py-3">
                    <div className="spinner-border spinner-border-sm text-secondary" role="status"></div>
                    <p className="mt-2 mb-0 small text-muted">Загрузка авторов...</p>
                  </div>
                ) : authors.length > 0 ? (
                  <ul className="list-unstyled mb-0">
                    {authors.map((author, i) => (
                      <li key={i} className="py-1 d-flex">
                        <span className="text-muted me-2 small">{i + 1}.</span>
                        <span className="small">{author}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-3 text-muted">
                    {selectedCity ? 'Авторы не найдены' : (
                      <>
                        <i className="bi bi-pie-chart fs-4 opacity-50"></i>
                        <p className="mt-2 mb-0 small">Выберите город на диаграмме</p>
                      </>
                    )}
                  </div>
                )}
              </div>

              {selectedCity && (
                <div className="mt-3 pt-2 small text-muted border-top">
                  Всего {selectedCityData?.value} {getPublicationsWord(selectedCityData?.value)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <DashboardPageWrapper
      filtersComponent={
        <div className="filters">
          Фильтры
        </div>
      }
      dashboardComponent={
        <div className="dashboard-content">
          <div className="text-center mb-3">
            <h3 className="fw-light">Распределение публикаций по городам</h3>
            <p className="text-muted small">Нажмите на сегмент диаграммы для просмотра авторов</p>
          </div>
          {renderContent()}
        </div>
      }
    />
  );
};