import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { DashboardLayoutContainer } from "../../hoc/DashboardLayoutContainer";

export const ARTICLES = () => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);

  const declinateArticles = (count) => {
    if (count % 100 >= 11 && count % 100 <= 19) {
      return "статей";
    }

    const lastDigit = count % 10;
    if (lastDigit === 1) return "статья";
    if (lastDigit >= 2 && lastDigit <= 4) return "статьи";
    return "статей";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://46.8.232.101:5001/api/statistics/publications-by-year"
        );

        if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

        const result = await response.json();

        if (typeof result !== "object" || result === null) {
          throw new Error("Неверный формат данных");
        }

        const formattedData = Object.entries(result)
          .map(([year, count]) => ({ year: +year, count: +count }))
          .sort((a, b) => a.year - b.year);

        setChartData(formattedData);
      } catch (err) {
        console.error("Ошибка:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!chartRef.current || chartData.length === 0) return;

    const chart = echarts.init(chartRef.current);

    const options = {
      grid: {
        left: "3%",
        right: "4%",
        bottom: "12%",
        containLabel: true,
      },
      tooltip: {
        trigger: "axis",
        formatter: ({ 0: { name, value } }) => {
          const word = declinateArticles(value);
          return `${name} год: ${value} ${word}`;
        },
      },
      xAxis: {
        type: "category",
        data: chartData.map((d) => d.year),
        axisLabel: { rotate: 45 },
      },
      yAxis: {
        type: "value",
        name: "Количество статей",
        minInterval: 1,
      },
      series: [
        {
          type: "bar",
          data: chartData.map((d) => ({
            value: d.count,
            name: d.year.toString(),
            itemStyle: {
              color: "#42bbc6",
              borderRadius: [4, 4, 0, 0],
            },
          })),
        },
      ],
      dataZoom: [{ type: "inside" }],
    };

    chart.setOption(options);

    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, [chartData]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center py-4">
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

    return (
      <div
        ref={chartRef}
        style={{
          width: "450%",
          height: "500px",
          minHeight: "300px",
        }}
      />
    );
  };

  return (
    <>
      <DashboardLayoutContainer>
        <div className="dashboard-content">
          <div className="text-center mb-4">
            <h4 className="fw-light">Распределение статей по годам</h4>
          </div>
          <div className="card">
            <div className="card-body">{renderContent()}</div>
          </div>
        </div>
      </DashboardLayoutContainer>
    </>
  );
};
