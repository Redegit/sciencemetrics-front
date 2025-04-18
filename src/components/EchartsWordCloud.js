import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import "echarts-wordcloud";

const EchartsWordCloud = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Initialize chart
    const chart = echarts.init(chartRef.current);

    // Word cloud data
    const data = [
      { name: "кибербезопасность", value: 100 },
      { name: "экономика", value: 80 },
      { name: "big Data", value: 60 },
      { name: "цифровая экономика", value: 55 },
      { name: "маркетплейс", value: 50 },
      { name: "интернет-продажи", value: 45 },
      { name: "цифровизация", value: 40 },
      { name: "risks", value: 35 },
      { name: "арендатор", value: 30 },
      { name: "API", value: 25 },
      { name: "CSS", value: 20 },
      { name: "хай-тек", value: 15 },
      { name: "продвинутый ИИ", value: 10 },
      { name: "риски", value: 65 },
      { name: "моделирование", value: 40 },
      { name: "циркулярная экономика", value: 35 },
      { name: "convolutional neural network (CNN)", value: 30 },
      { name: "кризис", value: 25 },
      { name: "фактор риска", value: 20 },
      { name: "методы антикризисного управления", value: 15 },
    ];

    // Configuration options
    const options = {
      title: {
        text: "Отображение количества слов по годам 2024+2025",
        left: "center",
        top: 20,
      },
      tooltip: {
        show: true,
        formatter: (params) => {
          return `${params.data.name}: ${params.data.value}`;
        },
      },
      series: [
        {
          type: "wordCloud",
          shape: "circle",
          left: "center",
          top: "center",
          width: "90%",
          height: "90%",
          right: null,
          bottom: null,
          sizeRange: [12, 60],
          rotationRange: [-45, 45],
          rotationStep: 15,
          gridSize: 8,
          drawOutOfBound: false,
          textStyle: {
            fontFamily: "Arial",
            fontWeight: "bold",
            color: function () {
              return `rgb(${Math.round(Math.random() * 160)}, ${Math.round(
                Math.random() * 160
              )}, ${Math.round(Math.random() * 160)})`;
            },
          },
          emphasis: {
            focus: "self",
            textStyle: {
              shadowBlur: 10,
              shadowColor: "#333",
            },
          },
          data: data,
        },
      ],
    };

    // Set options and render chart
    chart.setOption(options);

    // Handle window resize
    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, []);

  return (
    <div
      ref={chartRef}
      style={{
        width: "100%",
        height: "500px",
        margin: "0 auto",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    />
  );
};

export default EchartsWordCloud;
