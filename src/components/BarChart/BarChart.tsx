import { DashboardLayoutContainer } from "../../hoc/DashboardLayoutContainer";
import ReactECharts from "echarts-for-react";

type Props = {};
export const BarChart = ({}: Props) => {
  const specializations = Object.keys(mockData);
  const keys = ["k1", "k2", "k3", "k4"];

  const option = {
    tooltip: { trigger: "axis" },
    legend: { data: keys },
    xAxis: { type: "category", data: specializations },
    yAxis: { type: "value" },
    series: keys.map((key) => ({
      name: key,
      type: "bar",
      data: specializations.map((spec) => mockData[spec][key]),
    })),
  };

  return (
    <DashboardLayoutContainer>
      <ReactECharts option={option} style={{ height: 400, width: "100%" }} />
    </DashboardLayoutContainer>
  );
};
