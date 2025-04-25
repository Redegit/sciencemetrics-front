import { useEffect, useRef } from "react";
import ReactECharts from "echarts-for-react";
import { GraphData, GraphLink, GraphNode, GraphOptions } from "../../../types";
import { getColorOnGradient } from "../../../utils/getColorOnGradient";
import { graphNodeGradients } from "../../../constants/graphNodeGradients";
import styles from "./GraphComponent.module.css";
import { GraphZoomControls } from "./GraphZoomControls";
import React from "react";

type Props = {
  options?: GraphOptions;
  graphData: GraphData;
};

export const GraphLayout = React.memo<Props>(({ graphData, options }) => {
  const chartRef = useRef<ReactECharts>(null);

  const { nodes, links, categories, title, name } = graphData;

  const getNodeColor = (node: GraphNode) => {
    const gradient = graphNodeGradients[node.category || 0];
    return getColorOnGradient(gradient, node.scale);
  };

  const option = {
    title: {
      text: title?.text,
      subtext: title?.subtext,
      left: "center",
      textStyle: {
        fontSize: 20,
        fontWeight: "bold",
      },
    },
    tooltip: {
      trigger: "item",
      formatter: function (params: echarts.ECElementEvent) {
        if (params.dataType === "node") {
          const nodeData = params.data as GraphNode;
          return (
            `${params.name}<br/>Количество публикаций: ${
              params.value || "Нет данных"
            }<br/>` +
            `${
              nodeData.aliases.length > 0
                ? `Алиасы:<br/> ${nodeData.aliases.join("<br/>")}<br/>`
                : ""
            }` +
            `ID: ${nodeData.id}`
          );
        } else if (params.dataType === "edge") {
          const edgeData = params.data as GraphLink;
          return `${params.name}<br/>${edgeData.weight} публикаций`;
        }
        return params.name;
      },
    },
    legend:
      categories.length > 1
        ? {
            data: categories.map((category) => category.name),
            orient: "vertical",
            left: 10,
            top: 20,
            bottom: 20,
          }
        : undefined,
    toolbox: {
      show: true,
      feature: {
        restore: {},
        saveAsImage: {},
      },
    },
    series: [
      {
        name: name,
        type: "graph",
        layout: "force",
        data: nodes.map((node) => ({
          ...node,
          itemStyle: {
            color: getNodeColor(node),
            opacity: 0.9,
          },
        })),
        edgeSymbol: options?.edgeSymbol,
        links: links,
        categories: categories,
        roam: true,
        label: {
          show: true,
          position: "right",
          fontSize: 10,
          // fontWeight: "bold",
          color: "#333",
          formatter: (params: { data: { name: string } }) => params.data.name,
        },
        force: {
          repulsion: 20,
          gravity: 0.2,
          edgeLength: 50,
        },
        lineStyle: {
          width: 2,
          opacity: 0.3,
          curveness: 0.2,
        },
        emphasis: {
          focus: "adjacency",
          lineStyle: {
            width: 4,
            color: "#284e9d",
          },
        },
      },
    ],
  };

  useEffect(() => {
    const chart = chartRef.current?.getEchartsInstance();
    if (chart) {
      chart.on("click", (params: echarts.ECElementEvent) => {
        if (params.dataType === "node") {
          console.log("Clicked node:", params.data);
        } else if (params.dataType === "edge") {
          console.log("Clicked link:", params.data);
        }
      });
    }

    return () => {
      if (chart) {
        chart.off("click");
      }
    };
  }, []);

  return (
    <div className={styles.graphContainer}>
      <GraphZoomControls chartRef={chartRef} />
      <ReactECharts
        ref={chartRef}
        option={option}
        style={{ height: "600px", width: "100%" }}
        opts={{ renderer: "canvas" }}
      />
    </div>
  );
});
