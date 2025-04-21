export type ApiNode = {
  id: string;
  name: string | string[];
  value: number;
  category: number;
};

export type ApiLink = {
  source: string;
  target: string;
  weight: number;
};

export type ApiCategory = {
  name: string;
};

export type ApiGraphData = {
  nodes: ApiNode[];
  links: ApiLink[];
  categories: ApiCategory[];
};
