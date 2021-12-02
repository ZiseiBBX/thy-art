import { IBrushProperty, ICircleProperty, IProperty, IRectangleProperty } from "./property.interface";

export type BrushMode = "Brush" | "Eraser";

export interface ICanvasState {
	circs: ICirc[]
}

export interface IPoint {
	x: number;
	y: number;
}

export interface ILine {
	mode: BrushMode;
	composition: "source-over" | "destination-out";
	properties: IProperty;
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
