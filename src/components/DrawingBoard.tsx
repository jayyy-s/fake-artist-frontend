import { MouseEvent, useEffect, useRef, useState } from "react";
import { drawLine } from "../utils/drawLine";
import useWebSocket from "react-use-websocket";
import { useParams } from "react-router-dom";
import { useUpdateImageMutation } from "../slices/gamesApiSice";
import { useSelector } from "react-redux";

const WS_URL = import.meta.env.VITE_WS_URL!;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

type DrawingBoardProps = {
  isGameStarted: boolean;
};

// copy lines drawn from other clients
const createLine = (
  context: CanvasRenderingContext2D,
  prevPosition: Point,
  currentPosition: Point,
  color: string
): void => {
  drawLine(context, prevPosition, currentPosition, color);
};

const DrawingBoard = (props: DrawingBoardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current ? canvasRef.current : null;
  const context = canvas?.getContext("2d");
  const [isDrawing, setIsDrawing] = useState(false);
  const [isDrawingTurn, setIsDrawingTurn] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [prevPosition, setPreviousPosition] = useState({ x: 0, y: 0 });

  const color = "#000000"; // TODO: Let players select colors? Somehow give players different colors
  const { gameId } = useParams();

  const [updateImage] = useUpdateImageMutation();

  const { canvasState } = useSelector((state: GameState) => state.gameState);

  const { sendJsonMessage, lastJsonMessage } =
    useWebSocket<DrawingBoardWebSocketData>(WS_URL, { share: true });

  // Handle mouse down (allow to draw line)
  const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>): void => {
    e.preventDefault();
    if (!isDrawingTurn) return;

    setIsDrawing(true);
    setPreviousPosition({
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    });
  };

  const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing || !canvas || !context || !isDrawingTurn) return;

    const currentPosition: Point = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };

    createLine(context, prevPosition, currentPosition, color);

    setPreviousPosition(currentPosition);
  };

  const handleMouseUp = (e: MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!canvas || !isDrawingTurn) return;

    try {
      updateImage({ canvasState: canvas.toDataURL(), gameId }).then(() => {
        // set drawing turn to false after canvas state updated
        setIsDrawingTurn(false);
        sendJsonMessage({
          type: "drawLine",
          data: { gameId },
        });
      });
    } catch (err) {
      const e = err as Error;
      console.log(e?.message);
    }

    setIsDrawing(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!context) return;

    const loadImage = (ctx: CanvasRenderingContext2D, imageSrc: string) => {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        ctx.drawImage(image, 0, 0);
      };
    };

    loadImage(context, canvasState);

    if (lastJsonMessage) {
      switch (lastJsonMessage.type) {
        case "setHostClient":
          setIsHost(true);
          break;
        case "drawingTurn":
          setIsDrawingTurn(true);
          break;
      }
    }
  }, [lastJsonMessage, canvasState]);

  const startGameHandler = () => {
    sendJsonMessage({ type: "hostStartGame", data: { gameId } });
  };

  return (
    <div className="bg-white border border-black rounded relative overflow-hidden inline-block">
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
      />
      {!props.isGameStarted && (
        <div className="flex items-center justify-center absolute w-full h-full inset-0 bg-black bg-opacity-20">
          {isHost && (
            <div className="flex flex-col items-center justify-center w-72 h-36 bg-slate-50 border rounded-md border-black">
              <div onClick={startGameHandler} className="btn-fake-yellow">
                Start Game
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DrawingBoard;
