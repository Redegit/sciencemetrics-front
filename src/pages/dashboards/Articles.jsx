import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { request } from "../../api/request";
import { Dashboard } from "../../hoc/Dashboard";
import { Placeholder } from "../../components/Placeholder/Placeholder";

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
        const result = await request.get("/statistics/publications-by-year");

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
        <Placeholder status="error" errorMessage={error} fullheight reloadBtn />
      );
    }

    return (
      <div
        ref={chartRef}
        style={{
          width: "100%",
          height: "93%",
          minHeight: "300px",
        }}
      />
    );
  };

  return (
    <Dashboard.Body>
      <Dashboard.Layout title="Распределение статей по годам">
        {renderContent()}
      </Dashboard.Layout>
    </Dashboard.Body>
  );
};
