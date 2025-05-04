import { graphNodeGradients } from "../constants/graphNodeGradients";
import { ApiGraphData, ApiLink, ApiNode, GraphData, GraphLink, GraphNode } from "../types";

const getNodeSize = (scale: number) => {
  const minSize = 5;
  const maxSize = 30;
  return minSize + (maxSize - minSize) * scale;
};

export const transformGraphApiData = (apiData: ApiGraphData): GraphData => {
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

  const links: GraphLink[] = apiData.links.map((link: ApiLink) => ({
    source: link.source,
    target: link.target,
    weight: link.weight,
  }));

  const categories = apiData.categories.map((category, index) => ({
    name: category.name,
    itemStyle: {
      color: graphNodeGradients[index].slice(-2, -1)[0].color,
    },
  }));

  return {
    nodes,
    links,
    categories,
  };
};
