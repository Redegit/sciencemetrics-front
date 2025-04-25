export type Categories = {
  name: string;
  symbol?: string;
  symbolSize?: number;
  itemStyle?: unknown;
};

export type GraphNode = {
  id: string;
  name: string;
  symbolSize: number;
  label?: {
    show?: boolean;
  };
  value?: number;
  ignore?: boolean;
  symbol?: string;
  category?: number;
  itemStyle?: ItemStyle;
  scale: number;
  aliases: string[];
};

export type GraphLink = {
  source: string | number;
  target: string | number;
  weight?: number;
  itemStyle?: ItemStyle;
};

export type ItemStyle = {
  color?: string;
  opacity?: number;
  borderRadius?: (number | string)[] | number | string;
};

type GraphTitle = {
  text: string;
  subtext: string;
};

export type GraphOptions = {
  edgeSymbol?: [string, string];
};

export type GraphData = {
  nodes: GraphNode[];
  links: GraphLink[];
  categories: Categories[];
  title?: GraphTitle;
  name?: string;
};

export type ColorStop = {
  offset: number;
  color: string;
};

export type Gradient = ColorStop[];
