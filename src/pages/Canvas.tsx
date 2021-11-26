import { Layer as LayerRef } from "konva/lib/Layer";
import { KonvaEventObject } from "konva/lib/Node";
import { Stage as StageRef } from "konva/lib/Stage";
import { useRef, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import { useImmer } from "use-immer";
import { Box, BoxProps } from "rebass"

interface ICanvasState {
	isDrawing: boolean;
	recs: IRec[];
}

interface IRec {
	startX: number;
	startY: number;
	width: number;
	height: number;
	endX?: number;
	endY?: number;
}

function Canvas() {
	const [state, setState] = useImmer<ICanvasState>({
		isDrawing: false,
		recs: [],
	});

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  const containerRef = useRef<BoxProps>(null)
  const canvasRef = useRef(null)
	const stageRef = useRef<StageRef>(null);
	const layerRef = useRef<LayerRef>(null);

  console.log(containerRef.current?.height)

	const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
		if (!state.isDrawing) {
			return;
		}

		const point = stageRef.current!.getPointerPosition();
		const curRecIndex = state.recs.length - 1;

		setState((draft: ICanvasState) => {
			draft.recs[curRecIndex].width = point!.x - draft.recs[curRecIndex].startX;
			draft.recs[curRecIndex].height = point!.y - draft.recs[curRecIndex].startY;
		});
	};

	const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
		const point = stageRef.current!.getPointerPosition();
		console.log(`Down - ${point!.x} ${point!.y}`);

		setState((draft: ICanvasState) => {
			draft.isDrawing = true;
			draft.recs.push({
				width: 0,
				height: 0,
				startX: point!.x,
				startY: point!.y,
			});
		});
	};

	const handleMouseUp = (e: KonvaEventObject<MouseEvent>) => {
		setState({ ...state, isDrawing: false });
	};

	return (
    <Box ref={containerRef} height="100vh">
      <Stage
        ref={stageRef}
        width={dimensions.width}
        height={dimensions.height}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <Layer ref={layerRef} onMouseDown={handleMouseDown}>
          {state.recs.map((rec, index) => {
            return (
              <Rect
                key={index}
                x={rec.startX}
                y={rec.startY}
                width={rec.width}
                height={rec.height}
                stroke="black"
                strokeEnabled
              />
            );
          })}
        </Layer>
      </Stage>
    </Box>
	);
}

export default Canvas;
