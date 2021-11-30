import produce from "immer";
import { SetState, GetState } from "zustand";
import {
	IBrushProperty,
	ICircleProperty,
	IEraserProperty,
	IRectangleProperty,
	ShapeType,
} from "../interfaces/property.interface";
import { IStore } from "./store";

export interface IPropertyStore {
	brushProperties: IBrushProperty;
	eraserProperties: IEraserProperty;
	rectangleProperties: IRectangleProperty;
	circleProperties: ICircleProperty;

	modifyBrushColor(color: string): void;
	modifyBrushWidth(width: number): void;

	modifyEraserColor(color: string): void;
	modifyEraserWidth(width: number): void;

	modifyRectangleStrokeColor(color: string): void;
	modifyRectangleFillColor(color: string): void;
	modifyRectangleWidth(width: number): void;
	modifyRectangleType(type: ShapeType): void;

	modifyCircleStrokeColor(color: string): void;
	modifyCircleFillColor(color: string): void;
	modifyCircleWidth(width: number): void;
	modifyCircleType(type: ShapeType): void;
}

const propertyStore = (set: SetState<IStore>, get: GetState<IStore>): IPropertyStore => ({
	eraserProperties: {
		strokeColor: "#ffffff",
		width: 5,
	},
	brushProperties: {
		strokeColor: "#000000",
		width: 5,
	},
	rectangleProperties: {
		strokeColor: "#000000",
		fillColor: "#000000",
		width: 5,
		type: "stroke",
	},
	circleProperties: {
		strokeColor: "#000000",
		fillColor: "#000000",
		width: 5,
		type: "stroke",
	},

	modifyBrushColor: (color) => {
		set(
			produce((state: IPropertyStore) => {
				state.brushProperties.strokeColor = color;
			})
		);
	},
	modifyBrushWidth: (width) => {
		set(
			produce((state: IPropertyStore) => {
				state.brushProperties.width = width;
			})
		);
	},

	modifyEraserColor: (color) => {
		set(
			produce((state: IPropertyStore) => {
				state.eraserProperties.strokeColor = color;
			})
		);
	},
	modifyEraserWidth: (width) => {
		set(
			produce((state: IPropertyStore) => {
				state.eraserProperties.width = width;
			})
		);
	},

	modifyRectangleStrokeColor: (color) => {
		set(
			produce((state: IPropertyStore) => {
				state.rectangleProperties.strokeColor = color;
			})
		);
	},
	modifyRectangleFillColor: (color) => {
		set(
			produce((state: IPropertyStore) => {
				state.rectangleProperties.fillColor = color;
			})
		);
	},
	modifyRectangleWidth: (width) => {
		set(
			produce((state: IPropertyStore) => {
				state.rectangleProperties.width = width;
			})
		);
	},
	modifyRectangleType: (type) => {
		set(
			produce((state: IPropertyStore) => {
				state.rectangleProperties.type = type;
			})
		);
	},

	modifyCircleStrokeColor: (color) => {
		set(
			produce((state: IPropertyStore) => {
				state.circleProperties.strokeColor = color;
			})
		);
	},
	modifyCircleFillColor: (color) => {
		set(
			produce((state: IPropertyStore) => {
				state.circleProperties.fillColor = color;
			})
		);
	},
	modifyCircleWidth: (width) => {
		set(
			produce((state: IPropertyStore) => {
				state.circleProperties.width = width;
			})
		);
	},
	modifyCircleType: (type) => {
		set(
			produce((state: IPropertyStore) => {
				state.circleProperties.type = type;
			})
		);
	},
});

export default propertyStore;
