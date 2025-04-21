import { Gradient } from "../types";

export const getColorOnGradient = (
  gradientStops: Gradient,
  position: number
) => {
  if (position < 0) position = 0;
  if (position > 1) position = 1;

  let startStop, endStop;
  for (let i = 0; i < gradientStops.length; i++) {
    if (gradientStops[i].offset >= position) {
      endStop = gradientStops[i];
      startStop = gradientStops[i - 1];
      break;
    }
  }

  if (!endStop) {
    return gradientStops[gradientStops.length - 1].color;
  }

  if (!startStop) {
    return gradientStops[0].color;
  }

  const range = endStop.offset - startStop.offset;
  const ratio = (position - startStop.offset) / range;

  return interpolateColor(startStop.color, endStop.color, ratio);
};

const interpolateColor = (color1: string, color2: string, factor: number) => {
  if (factor <= 0) return color1;
  if (factor >= 1) return color2;

  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);

  const r = Math.round(c1.r + factor * (c2.r - c1.r));
  const g = Math.round(c1.g + factor * (c2.g - c1.g));
  const b = Math.round(c1.b + factor * (c2.b - c1.b));

  return rgbToHex(r, g, b);
};

const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const hexNumber = parseInt(hex.replace(/^#/, ""), 16);
  const r = (hexNumber >> 16) & 255;
  const g = (hexNumber >> 8) & 255;
  const b = hexNumber & 255;
  return { r, g, b };
};

const rgbToHex = (r: number, g: number, b: number) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};
