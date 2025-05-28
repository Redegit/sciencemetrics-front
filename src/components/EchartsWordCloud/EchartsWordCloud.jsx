import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import "echarts-wordcloud";
import "./EchartsWordCloud.scss";

const EchartsWordCloud = ({ data, year }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    chartInstance.current = echarts.init(chartRef.current);

    const options = {
      tooltip: {
        extraCssText: "width:auto; white-space:pre-wrap;",
        confine: true,
        show: true,
        formatter: (params) => {
          return `${params.data.name}: ${params.data.value} упоминаний`;
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
          sizeRange: [12, 60],
          rotationRange: [-45, 45],
          rotationStep: 15,
          gridSize: 8,
          drawOutOfBound: false,
          textStyle: {
            fontFamily: "Arial",
            fontWeight: "bold",
            color: () => {
              return `rgb(${Math.round(Math.random() * 160)}, 
                      ${Math.round(Math.random() * 160)}, 
                      ${Math.round(Math.random() * 160)})`;
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

    chartInstance.current.setOption(options);

    const handleResize = () => chartInstance.current?.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartInstance.current) {
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
    };
  }, [data, year]);

  return (
    <div
        ref={chartRef}
        style={{
          width: "100%",
          height: "93%",
          margin: "0 auto",
        }}
    />
  );
};

export default EchartsWordCloud;
