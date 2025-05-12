import { useCallback, useEffect, useRef } from "react";
import ReactECharts from "echarts-for-react";
import {
  ClickedItem,
  GraphData,
  GraphLink,
  GraphNode,
  GraphOptions,
  GraphTables,
} from "../../../types";
import { getColorOnGradient } from "../../../utils/getColorOnGradient";
import { graphNodeGradients } from "../../../constants/graphNodeGradients";
import styles from "./GraphComponent.module.css";
import { GraphZoomControls } from "./GraphZoomControls";
import React from "react";
import { getPublicationsWord } from "../../../utils/getPublicationsWord";
import { GraphTablePaginated } from "../GraphTable/GraphTablePaginated";

type Props = {
  options?: GraphOptions;
  graphData: GraphData;
  graphTables?: GraphTables;
};

export const GraphLayout = React.memo<Props>(
  ({ graphData, options, graphTables }) => {
    const chartRef = useRef<ReactECharts>(null);
    const [clickedItem, setClickedItem] = React.useState<ClickedItem<
      "node" | "link"
    > | null>(null);
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
            let nodeLabel = `<b>${params.name}</b>`;
            if (nodeData.value) {
              nodeLabel += `<br/><b>${nodeData.value}</b> ${getPublicationsWord(
                nodeData.value
              )}`;
            }
            if (nodeData.aliases.length > 0) {
              nodeLabel += `<br/><b>Алиасы</b>: <br/>${nodeData.aliases.join(
                "<br/>"
              )}`;
            }
            nodeLabel += `<br/>ID: ${nodeData.id}`;

            return nodeLabel;
          } else if (params.dataType === "edge") {
            const edgeData = params.data as GraphLink;
            let edgeLabel = params.name;
            if (edgeData.weight) {
              edgeLabel += `<br/>${edgeData.weight} ${getPublicationsWord(
                edgeData.weight
              )}`;
            }

            return edgeLabel;
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
            repulsion: 100,
            gravity: 0.1,
            edgeLength: 100,
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

    const handleNodeClick = useCallback(
      (data: GraphNode) => {
        const nodeId = data.id;
        if (graphTables?.node && nodeId !== undefined) {
          setClickedItem({
            params: {
              nodeId,
            },
            type: "node",
          });
        }
      },
      [graphTables?.node]
    );

    const handleLinkClick = useCallback(
      (data: GraphLink) => {
        const { source, target } = data;
        if (graphTables?.node && target && source) {
          setClickedItem({
            params: {
              source,
              target,
            },
            type: "link",
          });
        }
      },
      [graphTables?.node]
    );

    const handleGraphClick = useCallback(
      (params: echarts.ECElementEvent) => {
        const data = params.data;
        if (params.dataType === "node") {
          handleNodeClick(data as GraphNode);
        } else if (params.dataType === "edge") {
          handleLinkClick(data as GraphLink);
        }
      },
      [handleNodeClick, handleLinkClick]
    );

    useEffect(() => {
      const chart = chartRef.current?.getEchartsInstance();
      if (chart) {
        chart.on("click", handleGraphClick);
      }

      return () => {
        if (chart) {
          chart.off("click");
        }
      };
    }, [handleGraphClick]);

    return (
      <div className={styles.graph_container}>
        <div className={styles.graph_container__position}>
          <GraphZoomControls chartRef={chartRef} />
          <ReactECharts
            ref={chartRef}
            option={option}
            style={{ height: "600px", width: "100%" }}
            opts={{ renderer: "canvas" }}
          />
        </div>
        {clickedItem && graphTables && (
          <GraphTablePaginated
            tablesOptions={graphTables}
            clickedItem={clickedItem}
          />
        )}
      </div>
    );
  }
);
