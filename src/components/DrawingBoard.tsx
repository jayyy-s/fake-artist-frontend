import { useEffect, useRef, useState } from "react";
import { drawLine } from "../utils/drawLine";
import useWebSocket from "react-use-websocket";
import { useParams, useNavigate } from "react-router-dom";
import {
  useUpdateImageMutation,
  useFetchGameByIdMutation,
} from "../slices/gamesApiSice";

const WS_URL = "ws://localhost:5000";
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

type WebSocketData = {
  type: string;
  data: {
    canvasState?: string;
    gameState?: string;
  };
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

const DrawingBoard = () => {
  const [isClientReady, setIsClientReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current ? canvasRef.current : null;
  const context = canvas?.getContext("2d");
  const [isDrawing, setIsDrawing] = useState(false);
  // const [isDrawingTurn, setIsDrawingTurn] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [prevPosition, setPreviousPosition] = useState({ x: 0, y: 0 });
  const color = "#000000"; // TODO: Let players select colors? Somehow give players different colors
  const { gameId } = useParams();

  const navigate = useNavigate();

  const [updateImage] = useUpdateImageMutation();
  const [fetchGameById] = useFetchGameByIdMutation();

  // ISSUE: Establsihing ws connection before I know the game exists
  const { sendJsonMessage, lastJsonMessage } = useWebSocket<WebSocketData>(
    WS_URL,
    { share: true }
  );

  // Handle mouse down (allow to draw line)
  const handleMouseDown = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ): void => {
    e.preventDefault();
    setIsDrawing(true);
    setPreviousPosition({
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    });
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ): void => {
    e.preventDefault();
    if (!isDrawing || !canvas || !context) return;

    const currentPosition: Point = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };

    createLine(context, prevPosition, currentPosition, color);

    setPreviousPosition(currentPosition);
  };

  const handleMouseUp = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!canvas) return;

    try {
      updateImage({ canvasState: canvas.toDataURL(), gameId }).then(() => {
        // set drawing turn to false after canvas state updated
        // setIsDrawingTurn(false);
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

    const clientReadyHandler = async () => {
      try {
        const game = await fetchGameById({ gameId }).unwrap();
        // set current game state
        loadImage(context, game.canvasState);
        setIsGameStarted(game.gameState === "active");

        sendJsonMessage({ type: "clientReady", data: { gameId } });
        setIsClientReady(true);
      } catch (err) {
        // if game not found (or something else went wrong) go back to the home page
        navigate("/");
      }
    };

    if (!isClientReady) {
      clientReadyHandler();
    }

    const loadImage = (ctx: CanvasRenderingContext2D, imageSrc: string) => {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        ctx.drawImage(image, 0, 0);
      };
    };

    const handleRedrawCurrentCanvasState = (ctx: CanvasRenderingContext2D) => {
      const { canvasState } = lastJsonMessage.data;
      if (!canvasState) return;

      loadImage(ctx, canvasState);
    };

    if (lastJsonMessage) {
      switch (lastJsonMessage.type) {
        case "setHostClient":
          setIsHost(true);
          break;
        case "drawCurrentCanvasState":
          handleRedrawCurrentCanvasState(context);
          break;
        // case "drawingTurn":
        //   setIsDrawingTurn(true);
        //   break;
        case "serverStartGame":
          setIsGameStarted(true);
          break;
      }
    }
  }, [
    isClientReady,
    lastJsonMessage,
    gameId,
    sendJsonMessage,
    fetchGameById,
    navigate,
  ]);

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
      {!isGameStarted && (
        <div className="flex items-center justify-center absolute w-full h-full inset-0 bg-black bg-opacity-20">
          {isHost && (
            <div onClick={startGameHandler} className="btn-fake-yellow">
              Start Game
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DrawingBoard;
