import { MouseEvent, useEffect, useRef, useState } from "react";
import { drawLine } from "../../utils/drawLine";
import useWebSocket from "react-use-websocket";
import { useParams } from "react-router-dom";
import { useUpdateImageMutation } from "../../slices/gamesApiSice";
import { useDispatch, useSelector } from "react-redux";
import { setIsHost, setIsQuestionMaster } from "../../slices/clientStateSlice";
import DrawingBoardOverlay from "./DrawingBoardOverlay/DrawingBoardOverlay";
import {
  ClientState,
  GameState,
  PlayerState,
} from "../../types/sliceStateTypes";
import { gamePhases, drawingBoardVariants } from "../../types/enums";
import { setFakeArtistGuess } from "../../slices/gameStateSlice";

const WS_URL = import.meta.env.VITE_WS_URL!;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current ? canvasRef.current : null;
  const context = canvas?.getContext("2d");
  const [isDrawing, setIsDrawing] = useState(false);
  const [isDrawingTurn, setIsDrawingTurn] = useState(false);
  const [prevPosition, setPreviousPosition] = useState({ x: 0, y: 0 });

  const [isFakeArtistGuess, setIsFakeArtistGuess] = useState(false);
  const [
    isPromptQuestionMasterTitleCheck,
    setIsPromptQuestionMasterTitleCheck,
  ] = useState(false);

  const { colorCombo } = useSelector((state: PlayerState) => state.player);
  const { gameId } = useParams();

  const [updateImage] = useUpdateImageMutation();

  const dispatch = useDispatch();

  const { canvasState, isPromptSet, gamePhase, fakeArtistGuess } = useSelector(
    (state: GameState) => state.gameState
  );

  const { isQuestionMaster, isHost } = useSelector(
    (state: ClientState) => state.clientState
  );

  const { winner } = useSelector((state: GameState) => state.gameState);

  const { sendJsonMessage, lastJsonMessage } = useWebSocket<WebSocketData>(
    WS_URL,
    { share: true }
  );

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

    createLine(context, prevPosition, currentPosition, colorCombo.primary);

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
          dispatch(setIsHost({ isHost: true }));
          break;
        case "drawingTurn":
          setIsDrawingTurn(true);
          break;
        case "promptQuestionMaster":
          dispatch(setIsQuestionMaster({ isQuestionMaster: true }));
          break;
        case "promptFakeArtistGuess":
          setIsFakeArtistGuess(true);
          break;
        case "promptQuestionMasterTitleCheck":
          setIsPromptQuestionMasterTitleCheck(true);
          if (lastJsonMessage.data.fakeArtistGuess) {
            dispatch(
              setFakeArtistGuess({
                fakeArtistGuess: lastJsonMessage.data.fakeArtistGuess,
              })
            );
          }
          break;
      }
    }
  }, [lastJsonMessage, canvasState, dispatch]);

  return (
    <div className="bg-white rounded relative overflow-hidden inline-block">
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
      />
      {gamePhase === gamePhases.inactive && (
        <DrawingBoardOverlay
          variant={
            isHost ? drawingBoardVariants.host : drawingBoardVariants.default
          }
        />
      )}
      {isQuestionMaster && !isPromptSet && gamePhase === gamePhases.active && (
        <DrawingBoardOverlay variant={drawingBoardVariants.questionMaster} />
      )}
      {isFakeArtistGuess && !fakeArtistGuess && (
        <DrawingBoardOverlay variant={drawingBoardVariants.fakeArtistGuess} />
      )}
      {!winner && isPromptQuestionMasterTitleCheck && (
        <DrawingBoardOverlay
          variant={drawingBoardVariants.questionMasterTitleCheck}
        />
      )}
      {winner && (
        <DrawingBoardOverlay variant={drawingBoardVariants.gameResult} />
      )}
    </div>
  );
};

export default DrawingBoard;
