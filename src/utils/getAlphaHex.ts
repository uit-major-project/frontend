export const getAlphaHex = (hex: string, alpha: number): string => {
  let alphaValue = Math.floor(Number.parseFloat(`-0.${alpha}`) * 255)
    .toString(16)
    .slice(1);

  if (alpha < 6) {
    alphaValue = '0' + alphaValue;
  }

  return hex + alphaValue;
};

interface rgb {
  r: number;
  g: number;
  b: number;
}

export const hexToRgb = (hex: string): rgb | undefined => {
  const result = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hex);
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : undefined;
};
