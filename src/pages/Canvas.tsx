import { Layer as LayerRef } from "konva/lib/Layer";
import { KonvaEventObject } from "konva/lib/Node";
import { Stage as StageRef } from "konva/lib/Stage";
import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Circle, Line, Group } from "react-konva";
import { useImmer } from "use-immer";
import { Box, BoxProps } from "rebass";
import useStore from "../store/store";
import Tools from "../interfaces/tools.interface";
import { ICanvasState } from "../interfaces/shape.interface";
import produce from "immer";
import { Button } from "@chakra-ui/button";
import { Stack } from "@chakra-ui/react";
import ModifyProperty from "../components/Properties/ModifyProperty";

function Canvas() {
	const [state, setState] = useImmer<ICanvasState>({
		isDrawing: false,
		recs: [],
		circs: [],
		lines: [],
	});

	const [dimensions, setDimensions] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	const tool = useStore((state) => state.tool);
	const brushProperties = useStore((state) => state.brushProperties);
	const eraserProperties = useStore((state) => state.eraserProperties);
	const rectangleProperties = useStore((state) => state.rectangleProperties);
	const circleProperties = useStore((state) => state.circleProperties);

	const canvasRef = useRef(null);
	const stageRef = useRef<StageRef>(null);
	const layerRef = useRef<LayerRef>(null);

	const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
		if (!state.isDrawing) {
			return;
		}

		const point = stageRef.current!.getPointerPosition();

		if (tool === Tools.BRUSH) {
			setState((draft: ICanvasState) => {
				const curIndex = draft.lines.length - 1;
				draft.lines[curIndex].points.push(point!.x);
				draft.lines[curIndex].points.push(point!.y);
			});
		} else if (tool === Tools.ERASER) {
			setState((draft: ICanvasState) => {
				const curIndex = draft.lines.length - 1;
				draft.lines[curIndex].points.push(point!.x);
				draft.lines[curIndex].points.push(point!.y);
			});
		} else if (tool === Tools.RECTANGLE) {
			setState((draft: ICanvasState) => {
				const curIndex = draft.recs.length - 1;
				draft.recs[curIndex].width = point!.x - draft.recs[curIndex].startX;
				draft.recs[curIndex].height = point!.y - draft.recs[curIndex].startY;
			});
		} else if (tool === Tools.CIRCLE) {
			setState((draft: ICanvasState) => {
				const curIndex = draft.circs.length - 1;
				const rad = point!.y - draft.circs[curIndex].startY;
				draft.circs[curIndex].radius = rad < 0 ? 0 : rad;
			});
		}
	};

	const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
		const point = stageRef.current!.getPointerPosition();

		setState((draft: ICanvasState) => {
			draft.isDrawing = true;
		});

		if (tool === Tools.BRUSH) {
			setState((draft: ICanvasState) => {
				draft.lines.push({
					composition: "source-over",
					mode: Tools.BRUSH,
					brushProperties: brushProperties,
					points: [point!.x, point!.y, point!.x, point!.y],
				});
			});
		} else if (tool === Tools.ERASER) {
			setState((draft: ICanvasState) => {
				draft.lines.push({
					composition: "destination-out",
					mode: Tools.ERASER,
					brushProperties: eraserProperties,
					points: [point!.x, point!.y, point!.x, point!.y],
				});
			});
		} else if (tool === Tools.RECTANGLE) {
			setState((draft: ICanvasState) => {
				draft.recs.push({
					width: 0,
					height: 0,
					startX: point!.x,
					startY: point!.y,
					color: rectangleProperties.color,
					strokeWidth: rectangleProperties.width
				});
			});
		} else if (tool === Tools.CIRCLE) {
			setState((draft: ICanvasState) => {
				draft.circs.push({
					startX: point!.x,
					startY: point!.y,
					radius: 0,
					color: circleProperties.color,
					strokeWidth: circleProperties.width
				});
			});
		}
	};

	const handleMouseUp = (e: KonvaEventObject<MouseEvent>) => {
		setState(
			produce((draft: ICanvasState) => {
				draft.isDrawing = false;
			})
		);
	};

	const clearShapes = () => {
		setState((draft: ICanvasState) => {
			draft.lines = []
			draft.recs = []
			draft.circs = []
		})
	}

	return (
		<Box height="100%">
			<Stack direction="row">
				<Button onClick={clearShapes}>Clear</Button>
				<ModifyProperty />
			</Stack>
			<div style={{ backgroundColor: "white" }}>
				<Stage
					ref={stageRef}
					width={dimensions.width}
					height={dimensions.height}
					onMouseMove={handleMouseMove}
					onMouseDown={handleMouseDown}
					onMouseUp={handleMouseUp}
				>
					<Layer ref={layerRef} onMouseDown={handleMouseDown}>
						<Group>
							{state.recs.map((rec, index) => {
								return (
									<Rect
										key={index}
										x={rec.startX}
										y={rec.startY}
										width={rec.width}
										height={rec.height}
										stroke={rec.color}
										strokeEnabled
										strokeWidth={rec.strokeWidth}
									/>
								);
							})}
						</Group>
						<Group>
							{state.lines.map((line, index) => {
								return (
									<Line
										key={index}
										points={line.points}
										globalCompositeOperation={line.composition}
										strokeEnabled
										stroke={line.brushProperties.color}
										strokeWidth={line.brushProperties.width}
									/>
								);
							})}
						</Group>
						<Group>
							{state.circs.map((circ, index) => {
								return (
									<Circle
										key={index}
										radius={circ.radius}
										x={circ.startX}
										y={circ.startY}
										strokeEnabled
										stroke={circ.color}
										strokeWidth={circ.strokeWidth}
									/>
								);
							})}
						</Group>
					</Layer>
				</Stage>
			</div>
		</Box>
	);
}

export default Canvas;
