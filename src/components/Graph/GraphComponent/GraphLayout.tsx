import { useCallback, useEffect, useRef, useState } from "react";
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
import { GraphTools } from "./graphTools";
import { Toolbox } from "./Toolbox/Toolbox";

type Props = {
  options?: GraphOptions;
  graphData: GraphData;
  graphTables?: GraphTables;
  toggleShowZeroCategoryCommonLinks?: () => void;
};

export const GraphLayout = React.memo<Props>(
  ({ graphData, options, graphTables, toggleShowZeroCategoryCommonLinks }) => {
    const chartRef = useRef<ReactECharts>(null);
    const [showZeroLinks, setShowZeroLinks] = useState(false);
    const [layoutAnimation, setLayoutAnimation] = useState(true);
    const [fullscreen, setFullscreen] = useState(false);

    const [clickedItem, setClickedItem] = React.useState<ClickedItem<
      "node" | "link"
    > | null>(null);

    const tools = React.useMemo(() => new GraphTools(chartRef), [chartRef]);

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
        extraCssText: "width:auto; white-space:pre-wrap;",
        confine: true,
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
      series: [
        {
          name: name,
          type: "graph",
          layout: "force",
          data: nodes.map((node) => ({
            ...node,
            itemStyle: {
              color: getNodeColor(node),
              borderWidth: 2,
              borderColor: "#eaf5ff",
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
            color: "#333",
            textShadowColor: "#fff",
            textShadowBlur: 2,
            textBorderColor: "#fff",
            textBorderWidth: 2,
            formatter: (params: { data: { name: string } }) => params.data.name,
          },
          force: {
            repulsion: 200,
            gravity: 0.05,
            friction: 0.1,
            edgeLength: [20, 200],
            // edgeLength: null,
            initLayout: null,
          },
          lineStyle: {
            width: 2,
            opacity: 0.3,
            curveness: 0.2,
          },
          emphasis: {
            focus: "adjacency",
          },
        },
      ],
    };

    useEffect(() => {
      if (chartRef.current) {
        const tools = new GraphTools(chartRef);
        tools.setPhysics(true);
      }
    }, []);

    const handleNodeClick = useCallback(
      (data: GraphNode) => {
        console.log(data);

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
        console.log(data);

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

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setFullscreen(false);
      };

      if (fullscreen) {
        window.addEventListener("keydown", handleKeyDown);
      }

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [fullscreen]);

    useEffect(() => {
      tools.setPhysics(layoutAnimation);
    }, [tools, layoutAnimation]);

    return (
      <div className={styles.graph_container}>
        <div
          className={styles.graph_container__position}
          data-fullscreen={fullscreen}
        >
          <GraphZoomControls chartRef={chartRef} />
          <Toolbox
            buttons={[
              {
                label: "Сбросить граф",
                onClick: () => {
                  setLayoutAnimation(true);
                  tools.reset();
                },
                icon: "refresh",
              },
              {
                label: "Скачать PNG",
                onClick: tools.saveAsImage,
                icon: "download",
              },
              fullscreen
                ? {
                    label: "Свернуть",
                    onClick: () => setFullscreen(false),
                    icon: "fullscreenExit",
                  }
                : {
                    label: "На весь экран",
                    onClick: () => setFullscreen(true),
                    icon: "fullscreenEnter",
                  },
            ]}
            toggles={[
              {
                label: "Связи между синими узлами",
                value: showZeroLinks,
                onToggle: (v) => {
                  setShowZeroLinks(v);
                  toggleShowZeroCategoryCommonLinks?.();
                },
                // icon: "freeze",
              },
              {
                label: "Заморозить симуляцию",
                value: !layoutAnimation,
                onToggle: (v) => setLayoutAnimation(!v),
                // icon: "freeze",
              },
            ]}
          />
          <ReactECharts
            ref={chartRef}
            option={option}
            style={{ height: "100%", width: "100%" }}
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
