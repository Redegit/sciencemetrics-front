import { graphNodeGradients } from "../constants/graphNodeGradients";
import {
  ApiGraphData,
  ApiLink,
  ApiNode,
  GraphData,
  GraphLink,
  GraphNode,
} from "../types";

const getNodeSize = (scale: number) => {
  const minSize = 5;
  const maxSize = 30;
  return minSize + (maxSize - minSize) * scale;
};

const LINK_DEFAULT_VALUE = 1;
const LINK_FROM_NODE_BETWEEN_CAT_1_VALUE = 0.95;
const LINK_BETWEEN_CAT_1_VALUE = 0.8;

const LINK_COLOR_BLUE = "#284e9d";
const LINK_COLOR_ORANGE = "#F28D65";

export type NodesCategoryMap = Map<string, GraphNode["category"]>;

export type TransformedData = {
  graphData: GraphData;
  nodesCategoryMap: NodesCategoryMap;
};

export const transformGraphApiData = (
  apiData: ApiGraphData
): TransformedData => {
  const nodesCategoryMap: NodesCategoryMap = new Map();

  const getCategory = (nodeId: string): GraphNode["category"] | undefined => {
    return nodesCategoryMap.get(nodeId);
  };

  const nodeCountLinksToCat1Map = new Map<string, number>();

  const addNodeCountLinksToCat1Map = (nodeId: string) => {
    const cat1Count = nodeCountLinksToCat1Map.get(nodeId) || 0;
    nodeCountLinksToCat1Map.set(nodeId, cat1Count + 1);
  };

  const values = apiData.nodes.map((n) => n.value | 1);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const logMin = Math.log(min);
  const logMax = Math.log(max);

  const maxDiff = logMax - logMin;

  const calcScale = (value: number) => {
    if (maxDiff === 0) {
      return 1;
    } else {
      return (Math.log(value | 1) - logMin) / (logMax - logMin);
    }
  };

  const nodes: GraphNode[] = apiData.nodes.map((node: ApiNode) => {
    const scale = calcScale(node.value);
    nodesCategoryMap.set(node.id, node.category);
    return {
      id: node.id,
      name: Array.isArray(node.name) ? node.name[0] : node.name,
      value: node.value,
      category: node.category,
      symbolSize: getNodeSize(scale),
      scale,
      label: {
        show: scale >= 0.5,
      },
      aliases: Array.isArray(node.name) ? node.name.slice(1) : [],
    };
  });

  let links: GraphLink[] = apiData.links.map((link: ApiLink) => {
    if (getCategory(link.source) === 1 && getCategory(link.target) !== 1) {
      addNodeCountLinksToCat1Map(link.target);
    } else if (
      getCategory(link.target) === 1 &&
      getCategory(link.source) !== 1
    ) {
      addNodeCountLinksToCat1Map(link.source);
    }
    return {
      source: link.source,
      target: link.target,
      weight: link.weight,
      value: LINK_DEFAULT_VALUE,
      lineStyle: {
        color: LINK_COLOR_BLUE,
      },
    };
  });

  links = links.map((link) => {
    const isBetweenOrange =
      getCategory(link.source) === 1 && getCategory(link.target) === 1;
    const isBetweenBlue =
      getCategory(link.source) !== 1 && getCategory(link.target) !== 1;
    if (
      !isBetweenBlue &&
      (isBetweenOrange ||
        (nodeCountLinksToCat1Map.get(link.target) ?? 0) > 1 ||
        (nodeCountLinksToCat1Map.get(link.source) ?? 0) > 1)
    ) {
      return {
        ...link,
        value: isBetweenOrange
          ? LINK_BETWEEN_CAT_1_VALUE
          : LINK_FROM_NODE_BETWEEN_CAT_1_VALUE,
        lineStyle: {
          ...link.lineStyle,
          color: LINK_COLOR_ORANGE,
        },
      };
    } else {
      return link;
    }
  });

  const categories = apiData.categories.map((category, index) => ({
    name: category.name,
    itemStyle: {
      color: graphNodeGradients[index].slice(-2, -1)[0].color,
    },
  }));

  return {
    graphData: {
      nodes,
      links,
      categories,
    },
    nodesCategoryMap,
  };
};
