import produce from "immer";
import { SetState, GetState } from "zustand";
import { IBrushProperty, ICircleProperty, IEraserProperty, IRectangleProperty } from "../interfaces/property.interface";
import { IStore } from "./store";

export interface IPropertyStore {
	brushProperties: IBrushProperty;
  eraserProperties: IEraserProperty;
  rectangleProperties: IRectangleProperty
  circleProperties: ICircleProperty

	modifyBrushColor(color: string): void;
  modifyBrushWidth(width: number): void;

  modifyEraserColor(color: string): void
  modifyEraserWidth(width: number): void;

  modifyRectangleColor(color: string): void
  modifyRectangleWidth(width: number): void

  modifyCircleColor(color: string): void
  modifyCircleWidth(width: number): void
}

const propertyStore = (set: SetState<IStore>, get: GetState<IStore>): IPropertyStore => ({
  eraserProperties: {
    color: "#ffffff",
    width: 5
  },
	brushProperties: {
		color: "#000000",
		width: 5,
	},
  rectangleProperties: {
    color: "#000000",
    width: 5
  },
  circleProperties: {
    color: "#000000",
    width: 5
  },

  modifyBrushColor: (color) => {
    set(produce((state: IPropertyStore) => {
      state.brushProperties.color = color
    }))
  },
  modifyBrushWidth: (width) => {
    set(produce((state: IPropertyStore) => {
      state.brushProperties.width = width
    }))
  },

  modifyEraserColor: (color) => {
    set(produce((state: IPropertyStore) => {
      state.eraserProperties.color = color
    }))
  },
  modifyEraserWidth: (width) => {
    set(produce((state: IPropertyStore) => {
      state.eraserProperties.width = width
    }))
  },

  modifyRectangleColor: (color) => {
    set(produce((state: IPropertyStore) => {
      state.rectangleProperties.color = color
    }))
  },
  modifyRectangleWidth: (width) => {
    set(produce((state: IPropertyStore) => {
      state.rectangleProperties.width = width
    }))
  },

  modifyCircleColor: (color) => {
    set(produce((state: IPropertyStore) => {
      state.circleProperties.color = color
    }))
  },
  modifyCircleWidth: (width) => {
    set(produce((state: IPropertyStore) => {
      state.circleProperties.width = width
    }))
  }
});

export default propertyStore;
