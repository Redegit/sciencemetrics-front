export type VakCategory = "К1" | "К2" | "К3";

export type VakSpecializationData = Record<VakCategory, number>;

export type VakChartData = Record<string, VakSpecializationData>;
