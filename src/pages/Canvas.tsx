import { Layer as LayerRef } from "konva/lib/Layer";
import { KonvaEventObject } from "konva/lib/Node";
import { Stage as StageRef } from "konva/lib/Stage";
import { useEffect, useRef, useState, useCallback } from "react";
import { Stage, Layer, Rect, Circle, Line, Group } from "react-konva";
import { useImmer } from "use-immer";
import { Box, BoxProps } from "rebass";
import useStore, { selectTool } from "../store/store";
import Tools from "../interfaces/tools.interface";
import { ICanvasState } from "../interfaces/shape.interface";
import produce, { applyPatches, Patch } from "immer";
import { Button } from "@chakra-ui/button";
import { Stack } from "@chakra-ui/react";
import ModifyProperty from "../components/Properties/ModifyProperty";

// let changes: Patch[] = [];
// let inverseChanges: Patch[] = [];

// const pushChanges = (patches: Patch[], inversePatches: Patch[]) => {
// 	changes.push(...patches), inverseChanges.push(...inversePatches);
// };

function Canvas() {
	const [isDrawing, setIsDrawing] = useState(false)
	const [state, setState] = useState<ICanvasState>({
		recs: [],
		circs: [],
		lines: [],
	});
	const [changes, setChanges] = useState<Patch[]>([]);
	const [inverseChanges, setInverseChanges] = useState<Patch[]>([])

	const pushChanges = (patches: Patch[], inversePatches: Patch[]) => {
		setChanges([...changes, ...patches])
		setInverseChanges([...inverseChanges, ...inversePatches])
	}

	const [dimensions, setDimensions] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	const tool = useStore(state => state.tool);
	const brushProperties = useStore((state) => state.brushProperties);
	const eraserProperties = useStore((state) => state.eraserProperties);
	const rectangleProperties = useStore((state) => state.rectangleProperties);
	const circleProperties = useStore((state) => state.circleProperties);

	const canvasRef = useRef(null);
	const stageRef = useRef<StageRef>(null);
	const layerRef = useRef<LayerRef>(null);

	useEffect(() => {
		console.log("State changed")
		console.log(state)
	}, [state])

	const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
		if (!isDrawing) {
			return;
		}

		const point = stageRef.current!.getPointerPosition();

		if (tool === Tools.BRUSH) {
			setState(
				produce((draft: ICanvasState) => {
					const curIndex = draft.lines.length - 1;
					draft.lines[curIndex].points.push(point!.x);
					draft.lines[curIndex].points.push(point!.y);
				})
			);
		} else if (tool === Tools.ERASER) {
			setState(
				produce((draft: ICanvasState) => {
					const curIndex = draft.lines.length - 1;
					draft.lines[curIndex].points.push(point!.x);
					draft.lines[curIndex].points.push(point!.y);
				})
			);
		} else if (tool === Tools.RECTANGLE) {
			setState(
				produce((draft: ICanvasState) => {
					const curIndex = draft.recs.length - 1;
					draft.recs[curIndex].width = point!.x - draft.recs[curIndex].startX;
					draft.recs[curIndex].height = point!.y - draft.recs[curIndex].startY;
				})
			);
		} else if (tool === Tools.CIRCLE) {
			const res = produce(
				state,
				(draft: ICanvasState) => {
					const curIndex = draft.circs.length - 1;
					const rad = point!.y - draft.circs[curIndex].startY;
					draft.circs[curIndex].radius = rad < 0 ? 0 : rad;
				},
				pushChanges
			);

			setState(res);
		}
	};

	const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
		const point = stageRef.current!.getPointerPosition();

		setIsDrawing(true)

		if (tool === Tools.BRUSH) {
			setState(
				produce((draft: ICanvasState) => {
					draft.lines.push({
						composition: "source-over",
						mode: Tools.BRUSH,
						brushProperties: brushProperties,
						points: [point!.x, point!.y, point!.x, point!.y],
					});
				})
			);
		} else if (tool === Tools.ERASER) {
			setState(
				produce((draft: ICanvasState) => {
					draft.lines.push({
						composition: "destination-out",
						mode: Tools.ERASER,
						brushProperties: eraserProperties,
						points: [point!.x, point!.y, point!.x, point!.y],
					});
				})
			);
		} else if (tool === Tools.RECTANGLE) {
			setState(
				produce((draft: ICanvasState) => {
					draft.recs.push({
						width: 0,
						height: 0,
						startX: point!.x,
						startY: point!.y,
						properties: rectangleProperties,
					});
				})
			);
		} else if (tool === Tools.CIRCLE) {
			// const res = produce(state, (draft: ICanvasState) => {
			// 	draft.circs.push({
			// 		startX: point!.x,
			// 		startY: point!.y,
			// 		radius: 0,
			// 		properties: circleProperties
			// 	});
			// }, (patches, inversePatches) => {
			// 	changes.push(...patches)
			// 	inverseChanges.push(...inversePatches)
			// })

			// console.log(res)

			// setState(state => res)
			setState(
				produce((draft: ICanvasState) => {
					draft.circs.push({
						startX: point!.x,
						startY: point!.y,
						radius: 0,
						properties: circleProperties,
					});
				})
			);
		}
	};

	const handleMouseUp = (e: KonvaEventObject<MouseEvent>) => {
		setIsDrawing(false)
	};

	const clearShapes = () => {
		setState(
			produce((draft: ICanvasState) => {
				draft.lines = [];
				draft.recs = [];
				draft.circs = [];
			})
		);
	};

	return (
		<Box height="100%">
			<Stack direction="row">
				<Button
					onClick={() => {
						if (inverseChanges.length > 0) {
							let temp = inverseChanges[inverseChanges.length - 1]
							let temp2 = inverseChanges.slice(0, -2)
							setInverseChanges(temp2)
							const modifiedState = applyPatches(state, [temp as Patch]);
							setState(modifiedState);
						}
					}}
				>
					Undo
				</Button>
				<Button
					onClick={() => {
						if (changes.length > 0) {
							const modifiedState = applyPatches(state, [changes.pop() as Patch]);
							setState(modifiedState);
						}
					}}
				>
					Redo
				</Button>
				<Button
					onClick={() => {
						console.log(changes, inverseChanges);
					}}
				>
					Wow
				</Button>
				<Button onClick={clearShapes}>Clear</Button>
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
										stroke={
											rec.properties.type === "stroke" || rec.properties.type === "both"
												? rec.properties.strokeColor
												: undefined
										}
										strokeEnabled
										strokeWidth={rec.properties.width}
										fill={
											rec.properties.type === "fill" || rec.properties.type === "both"
												? rec.properties.fillColor
												: undefined
										}
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
										stroke={
											circ.properties.type === "stroke" || circ.properties.type === "both"
												? circ.properties.strokeColor
												: undefined
										}
										strokeWidth={circ.properties.width}
										fill={
											circ.properties.type === "fill" || circ.properties.type === "both"
												? circ.properties.fillColor
												: undefined
										}
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
										stroke={line.brushProperties.strokeColor}
										strokeWidth={line.brushProperties.width}
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
