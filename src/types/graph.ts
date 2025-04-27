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
  source: string;
  target: string;
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

// graph table (для отображения данных в таблице при клике на узел или ребро)
export type ClickedItemType = "node" | "link";

export type GraphTableColumn = {
  name: string;
  label: string;
};

export type GraphTableData = {
  items: Array<
    Record<string, string | number> & { key: string; link?: string }
  >;
  hasMore: boolean;
};

export type GraphTableFetchArgs<T extends ClickedItemType> = (T extends "node"
  ? { nodeId: string }
  : T extends "link"
  ? { source: string; target: string }
  : never) & { page?: number };

export type GraphTable<T extends ClickedItemType> = {
  title: string;
  columns: GraphTableColumn[];
  getData: (args: GraphTableFetchArgs<T>) => Promise<GraphTableData>;
};

export type ClickedItem<T extends ClickedItemType> = {
  params: GraphTableFetchArgs<T>;
  type: T;
};

export type GraphTables = {
  node?: GraphTable<"node">;
  link?: GraphTable<"link">;
};
