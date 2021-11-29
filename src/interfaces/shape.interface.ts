import { IBrushProperty } from "./property.interface";

export interface ICanvasState {
	isDrawing: boolean;
	lines: ILine[]
	circs: ICirc[]
	recs: IRec[]
}

export interface IPoint {
	x: number;
	y: number;
}

export interface ILine {
	mode: string;
	composition: "source-over" | "destination-out";
	brushProperties: IBrushProperty;
	points: number[];
}

export interface IRec {
	startX: number;
	startY: number;
	width: number;
	height: number;
	endX?: number;
	endY?: number;
	color: string
	strokeWidth: number
}

export interface ICirc {
	startX: number;
	startY: number;
	radius: number;
	color: string
	strokeWidth: number
}
