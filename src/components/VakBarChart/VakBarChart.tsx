import ReactECharts from "echarts-for-react";
import { VakCategory, VakChartData } from "../../types";
import React from "react";

type Props = {
  data: VakChartData;
};
export const VakBarChart = React.memo<Props>(({ data }) => {
  const keys: VakCategory[] = ["К3", "К2", "К1"];
  const specializations = Object.keys(data) as Array<keyof VakChartData>;

  const categoryColors: Record<VakCategory, string> = {
    "К1": "rgba(75,211,150,0.93)",
    "К2": "rgba(42,127,181,0.93)",
    "К3": "rgba(243,80,35,0.93)"
  };
  
  const option = {
    tooltip: { trigger: "axis", confine: true },
    legend: { data: keys.reverse() },
    xAxis: {
      type: "category",
      data: specializations,
      axisLabel: {
        rotate: 30,
        interval: 0,
      },
    },
    yAxis: {
      type: "value",
      minInterval: 1,
      axisLabel: {
        formatter: "{value}",
      },
      splitNumber: 5,
    },
    series: keys.map((key) => ({
      name: key,
      type: "bar",
      stack: "total",
      label: {
        show: true,
        position: "inside",
        formatter: function (params: any) {
          return params.value > 0 ? params.value : "";
        },
      },
      itemStyle: {
        color: categoryColors[key],
      },    
      data: specializations.map((spec) => data[spec][key]),
    })),
    dataZoom: [
      {
        type: "slider",
        xAxisIndex: 0,
        filterMode: "filter",
        start: 0,
        end: 30,
        height: 20,
        bottom: 10,
        handleIcon: handleIconPath,
        handleSize: "80%",
        handleStyle: {
          color: "rgba(0, 0, 0, 0)",
        },
      },
      {
        type: "inside",
        xAxisIndex: 0,
        zoomOnMouseWheel: false,
        moveOnMouseWheel: true,
        moveOnMouseMove: true,
      },
    ],
    grid: {
      bottom: 120,
    },
    axisLabel: {
      interval: 0,
      width: 150,
      overflow: "truncate",
      ellipsis: "...",
    },
  };

  return (
    <ReactECharts option={option} style={{ height: 400, width: "100%" }} />
  );
});

const handleIconPath =
  "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z";
