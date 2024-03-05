const drawLine = (
  context: CanvasRenderingContext2D,
  prevPosition: Point,
  currentPosition: Point,
  color: string
): void => {
  const lineWidth = 5;

  const startPoint = prevPosition ?? currentPosition;
  context.beginPath();
  context.lineWidth = lineWidth;
  context.strokeStyle = color;
  context.moveTo(prevPosition.x, prevPosition.y);
  context.lineTo(currentPosition.x, currentPosition.y);
  context.stroke();

  context.fillStyle = color;
  context.beginPath();
  context.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
  context.fill();
};

export { drawLine };
