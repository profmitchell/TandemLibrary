export const createGradient = (colors) => {
  if (!colors || colors.length < 3) {
    return null;
  }

  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 500;
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createRadialGradient(200, 150, 50, 400, 250, 600);
  gradient.addColorStop(0, colors[0] || "#333");
  gradient.addColorStop(0.3, colors[1] || "#444");
  gradient.addColorStop(0.6, colors[2] || "#555");
  if (colors[3]) gradient.addColorStop(0.85, colors[3]);
  gradient.addColorStop(1, colors[colors.length - 1] || "#222");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 800, 500);

  const gradient2 = ctx.createRadialGradient(600, 350, 100, 300, 200, 500);
  gradient2.addColorStop(0, colors[Math.min(2, colors.length - 1)] + "80");
  gradient2.addColorStop(1, "transparent");
  ctx.fillStyle = gradient2;
  ctx.fillRect(0, 0, 800, 500);

  return canvas;
};
