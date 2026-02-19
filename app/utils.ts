export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};
