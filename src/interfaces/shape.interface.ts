import { IBrushProperty, ICircleProperty, IRectangleProperty } from "./property.interface";

export interface ICanvasState {
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
	properties: IRectangleProperty
}

export interface ICirc {
	startX: number;
	startY: number;
	radius: number;
	properties: ICircleProperty
}
