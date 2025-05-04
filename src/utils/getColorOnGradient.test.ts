import { graphNodeGradients } from "../constants/graphNodeGradients";
import { getColorOnGradient } from "./getColorOnGradient";

describe("getColorOnGradient", () => {
  it("should return start color if value equals min", () => {
    expect(getColorOnGradient(graphNodeGradients[0], 0.5)).toBe("#2685b7");
  });

  it("should return end color if value equals max", () => {
    expect(getColorOnGradient(graphNodeGradients[0], 0.99)).toBe("#284f9e");
  });

  it("should return middle color if value is average", () => {
    expect(getColorOnGradient(graphNodeGradients[1], 0.5)).toBe("#f0ae72");
  });
});
