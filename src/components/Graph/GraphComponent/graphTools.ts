import ReactECharts from "echarts-for-react";

export class GraphTools {
  chartRef: React.RefObject<ReactECharts | null>;

  constructor(chartRef: React.RefObject<ReactECharts | null>) {
    this.chartRef = chartRef;
  }

  getChartInstance = () => {
    return this.chartRef.current?.getEchartsInstance();
  };

  private ensureChart(): echarts.ECharts {
    const chart = this.getChartInstance();
    if (!chart) throw new Error("Chart not initialized");
    return chart;
  }

  setPhysics = (physics: boolean): void => {
    this.ensureChart().setOption({
      series: [
        {
          force: { layoutAnimation: physics },
        },
      ],
    });
  };

  getPhysics = (): boolean => {
    const option = this.ensureChart().getOption() as {
      series?: Array<{ force?: { layoutAnimation?: boolean } }>;
    };

    const layoutAnimation = option.series?.[0]?.force?.layoutAnimation;
    return layoutAnimation ?? false;
  };

  togglePhysics = () => {
    const layoutAnimation = this.getPhysics();

    this.setPhysics(!layoutAnimation);
  };

  reset = () => {
    this.ensureChart().dispatchAction({ type: "restore" });
  };

  saveAsImage = () => {
    const chart = this.ensureChart();
    if (!chart) return;

    const url = chart.getDataURL({
      type: "png",
      pixelRatio: 2,
      backgroundColor: "#fff",
    });

    const link = document.createElement("a");
    link.href = url;
    link.download = "graph.png";
    link.click();
  };
}
