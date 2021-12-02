import { KonvaEventObject } from "konva/lib/Node";
import { Stage as StageRef } from "konva/lib/Stage";
import { useRef, useState } from "react";
import { Stage, Layer, Rect, Circle, Line, Group } from "react-konva";
import useStore from "../store/store";
import Tools from "../interfaces/tools.interface";
import { IPoint } from "../interfaces/shape.interface";
import { Vector2d } from "konva/lib/types";
interface ICanvasProps {
	height: number;
	width: number;
}

function Canvas({ height, width }: ICanvasProps) {
	const [isDrawing, setIsDrawing] = useState(false);

	const tool = useStore((state) => state.tool);

	const lines = useStore((state) => state.lines);
	const addLine = useStore((state) => state.addLine);
	const updateLine = useStore((state) => state.updateLine);

	const recs = useStore((state) => state.recs);
	const addRec = useStore((state) => state.addRec);
	const updateRec = useStore((state) => state.updateRec);

	const circs = useStore((state) => state.circs);
	const addCirc = useStore((state) => state.addCirc);
	const updateCirc = useStore((state) => state.updateCirc);

	const stageRef = useRef<StageRef>(null);

	const getPoint = (point: Vector2d | null): IPoint => {
		return {
			x: point!.x,
			y: point!.y,
		};
	};

	const handleMouseMove = () => {
		if (!isDrawing) {
			return;
		}

		const p = stageRef.current!.getPointerPosition();
		const point = getPoint(p);

		if (tool === Tools.BRUSH) {
			updateLine(point);
		} else if (tool === Tools.ERASER) {
			updateLine(point);
		} else if (tool === Tools.RECTANGLE) {
			updateRec(point);
		} else if (tool === Tools.CIRCLE) {
			updateCirc(point);
		}
	};

	const handleMouseDown = () => {
		const p = stageRef.current!.getPointerPosition();
		const point = getPoint(p);

		setIsDrawing(true);

		if (tool === Tools.BRUSH) {
			addLine(point, "Brush");
		} else if (tool === Tools.ERASER) {
			addLine(point, "Eraser");
		} else if (tool === Tools.RECTANGLE) {
			addRec(point);
		} else if (tool === Tools.CIRCLE) {
			addCirc(point);
		}
	};

	const handleMouseUp = () => {
		setIsDrawing(false);
	};

	return (
		<Stage
			ref={stageRef}
			width={width}
			height={height}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onMouseDown={handleMouseDown}
			onTouchStart={handleMouseDown}
			onTouchMove={handleMouseMove}
			onTouchEnd={handleMouseUp}
		>
			<Layer>
				<Rect x={0} y={0} width={width} height={height} fill="white" />
				<Group>
					{recs.map((rec, index) => {
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
					{circs.map((circ, index) => {
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
					{lines.map((line, index) => {
						return (
							<Line
								key={index}
								points={line.points}
								globalCompositeOperation={line.composition}
								strokeEnabled
								stroke={line.properties.strokeColor}
								strokeWidth={line.properties.width}
							/>
						);
					})}
				</Group>
			</Layer>
		</Stage>
	);
}

export default Canvas;
