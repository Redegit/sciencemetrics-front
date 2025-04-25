import React, { useRef, useEffect, useState } from "react";
import * as echarts from "echarts";
import { DashboardLayoutContainer } from "../../hoc/DashboardLayoutContainer";
import { request } from "../../api/request";

export const CITY = () => {
  const chartRef = useRef(null);
  const [citiesData, setCitiesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [authorsLoading, setAuthorsLoading] = useState(false);
  const chartInstance = useRef(null);

  const getPublicationsWord = (count) => {
    if (count % 10 <= 2) return "публикаций";
    switch (count % 10) {
      case 1:
        return "публикация";
      case 2:
      case 3:
      case 4:
        return "публикации";
      default:
        return "публикаций";
    }
  };

  const getAuthorsWord = (count) => {
    if (count % 10 <= 2) return "авторов";
    switch (count % 10) {
      case 1:
        return "автор";
      case 2:
      case 3:
      case 4:
        return "автора";
      default:
        return "авторов";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await request.get(
          "/statistics/authors-by-city?min_publications=100"
        );
        setCitiesData(
          data.map((item) => ({
            name: item[0],
            value: item[1],
          }))
        );
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedCity) {
      setAuthors([]);
      return;
    }

    const fetchAuthors = async () => {
      setAuthorsLoading(true);
      try {
        const data = await request.get(
          `/authors/by-city?city=${encodeURIComponent(selectedCity)}&limit=10`
        );
        setAuthors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setAuthorsLoading(false);
      }
    };

    fetchAuthors();
  }, [selectedCity]);

  useEffect(() => {
    if (!chartRef.current || loading || error || citiesData.length === 0)
      return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    const hueStep = 360 / citiesData.length;
    const colors = citiesData.map(
      (_, i) => `hsl(${(i * hueStep) % 360}, 70%, 60%)`
    );

    const option = {
      tooltip: {
        trigger: "item",
        formatter: (params) => {
          return `
            <strong>${params.name}</strong><br/>
            ${params.value} ${getAuthorsWord(params.value)}
          `;
        },
      },
      legend: {
        type: "scroll",
        orient: "vertical",
        right: 70,
        top: 20,
        bottom: 20,
        textStyle: {
          color: "#666",
          fontSize: 12,
        },
      },
      series: [
        {
          name: "Публикации по городам",
          type: "pie",
          radius: ["40%", "70%"],
          center: ["40%", "50%"],
          itemStyle: {
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
          },
          emphasis: {
            scale: true,
            scaleSize: 5,
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.3)",
            },
          },
          data: citiesData.map((city, index) => ({
            value: city.value,
            name: city.name,
            itemStyle: {
              color: colors[index],
              opacity: selectedCity && selectedCity !== city.name ? 0.3 : 1,
            },
          })),
          selectedMode: "single",
        },
      ],
    };

    chartInstance.current.setOption(option);

    const clickHandler = (params) => {
      if (params.componentType === "series") {
        setSelectedCity(params.name === selectedCity ? null : params.name);
      }
    };

    chartInstance.current.on("click", clickHandler);
    const handleResize = () => chartInstance.current.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance.current.off("click", clickHandler);
    };
  }, [loading, error, citiesData, selectedCity]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center py-6">
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

    const selectedCityData = citiesData.find((c) => c.name === selectedCity);

    return (
      <div className="row g-3">
        <div className="col-lg-8">
          <div className="card h-300">
            <div className="card-body p-12">
              <div
                ref={chartRef}
                style={{
                  width: "300%",
                  height: "500px",
                  minHeight: "300px",
                }}
              />
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card h-300">
            <div className="card-body d-flex flex-column">
              <h6 className="card-title d-flex justify-content-between align-items-center mb-4">
                <span className="fw-bold">
                  {selectedCity || "Выберите город"}
                </span>
                {selectedCity && (
                  <span className="text-muted small">
                    ТОП-{authors.length} {getAuthorsWord(authors.length)}
                  </span>
                )}
              </h6>

              <div
                className="authors-list-container flex-grow-1"
                style={{
                  overflowY: "auto",
                  borderTop: "1px solid #eee",
                  paddingTop: "1rem",
                }}
              >
                {authorsLoading ? (
                  <div className="text-center py-3">
                    <div
                      className="spinner-border spinner-border-sm text-secondary"
                      role="status"
                    />
                    <p className="mt-2 mb-0 small text-muted">
                      Загрузка авторов...
                    </p>
                  </div>
                ) : authors.length > 0 ? (
                  <ul className="list-unstyled mb-0">
                    {authors.map((author, i) => (
                      <li
                        key={i}
                        className="py-2 d-flex justify-content-between align-items-center"
                      >
                        <div className="d-flex align-items-center">
                          <span
                            className="text-muted me-2 small"
                            style={{ width: "20px" }}
                          >
                            {i + 1}.
                          </span>
                          <span className="small text-truncate">
                            {author.name}
                          </span>
                        </div>
                        <span className="text-muted small ms-2">
                          {author.publications}{" "}
                          {getPublicationsWord(author.publications)}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-3 text-muted">
                    {selectedCity
                      ? "Авторы не найдены"
                      : "Выберите город на диаграмме"}
                  </div>
                )}
              </div>

              {selectedCity && (
                <div className="mt-auto pt-2 small text-muted border-top">
                  Всего {selectedCityData?.value}{" "}
                  {getAuthorsWord(selectedCityData?.value)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayoutContainer>
      <div className="dashboard-content">
        <div className="text-center mb-3">
          <h3 className="fw-light">Распределение авторов по городам</h3>
          <p className="text-muted small">
            Нажмите на сегмент диаграммы для просмотра топ-10 авторов
          </p>
        </div>
        {renderContent()}
      </div>
    </DashboardLayoutContainer>
  );
};
