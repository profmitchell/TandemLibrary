const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return { h: h * 360, s, l };
};

const detectColorCategory = (colors) => {
  if (!colors || colors.length === 0) return "neutral";

  const hslColors = colors
    .map((hex) => {
      const rgb = hexToRgb(hex);
      return rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;
    })
    .filter(Boolean);

  if (hslColors.length === 0) return "neutral";

  const avgSaturation =
    hslColors.reduce((sum, c) => sum + c.s, 0) / hslColors.length;
  const avgLightness =
    hslColors.reduce((sum, c) => sum + c.l, 0) / hslColors.length;

  if (avgSaturation < 0.15) return "neutral";
  if (avgLightness > 0.85) return "light";
  if (avgLightness < 0.2) return "dark";

  const hues = hslColors.map((c) => c.h);
  const avgHue = hues.reduce((sum, h) => sum + h, 0) / hues.length;

  if (avgHue >= 0 && avgHue < 30) return "red";
  if (avgHue >= 30 && avgHue < 60) return "orange";
  if (avgHue >= 60 && avgHue < 90) return "yellow";
  if (avgHue >= 90 && avgHue < 150) return "green";
  if (avgHue >= 150 && avgHue < 210) return "cyan";
  if (avgHue >= 210 && avgHue < 270) return "blue";
  if (avgHue >= 270 && avgHue < 330) return "purple";
  if (avgHue >= 330) return "pink";

  return "neutral";
};

export { detectColorCategory };
