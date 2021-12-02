import { IBrushProperty, ICircleProperty, IProperty, IRectangleProperty } from "./property.interface";

export type BrushMode = "Brush" | "Eraser";
export type ToolType = "Line" | "Eraser" | "Circle" | "Rectangle" | "Delete"
export interface IShape {
	type: ToolType
}
export interface IPoint {
	x: number;
	y: number;
}

export interface ILine extends IShape {
	mode: BrushMode;
	composition: "source-over" | "destination-out";
	properties: IProperty;
	points: number[];
}

export interface IRec extends IShape {
	startX: number;
	startY: number;
	width: number;
	height: number;
	properties: IRectangleProperty
}

export interface ICirc extends IShape {
	startX: number;
	startY: number;
	radius: number;
	properties: ICircleProperty
}
