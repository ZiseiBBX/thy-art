import produce from "immer";
import { SetState, GetState } from "zustand";
import { IProperty } from "../interfaces/property.interface";
import { BrushMode, ICirc, ILine, IPoint, IRec } from "../interfaces/shape.interface";
import Tools from "../interfaces/tools.interface";
import { IStore } from "./store";

export interface IShapeStore {
	lines: ILine[];
	recs: IRec[];
	circs: ICirc[];

	addLine(point: IPoint, mode: BrushMode): void;
	addRec(point: IPoint): void;
	addCirc(point: IPoint): void;

	updateLine(point: IPoint): void;
	updateRec(point: IPoint): void;
	updateCirc(point: IPoint): void;

	clearShapes(): void;
}

const shapeStore = (set: SetState<IStore>, get: GetState<IStore>): IShapeStore => ({
	lines: [],
	recs: [],
	circs: [],

	addLine(point, mode) {
		set(
			produce((draft: IStore) => {
				draft.lines.push({
					composition: mode === "Brush" ? "source-over" : "destination-out",
					mode: mode,
					properties: mode === "Brush" ? get().brushProperties : get().eraserProperties,
					points: [point.x, point.y, point.x, point.y],
				});
			})
		);
	},
	addRec(point) {
		set(
			produce((draft: IStore) => {
				draft.recs.push({
					width: 0,
					height: 0,
					startX: point.x,
					startY: point.y,
					properties: get().rectangleProperties,
				});
			})
		);
	},
	addCirc(point) {
		set(
			produce((draft: IStore) => {
				draft.circs.push({
					startX: point!.x,
					startY: point!.y,
					radius: 0,
					properties: get().circleProperties,
				});
			})
		);
	},

	updateLine(point) {
		set(
			produce((draft: IStore) => {
				const curIndex = draft.lines.length - 1;
				draft.lines[curIndex].points.push(point.x);
				draft.lines[curIndex].points.push(point.y);
			})
		);
	},
	updateRec(point) {
		set(
			produce((draft: IStore) => {
				const curIndex = draft.recs.length - 1;
				draft.recs[curIndex].width = point.x - draft.recs[curIndex].startX;
				draft.recs[curIndex].height = point.y - draft.recs[curIndex].startY;
			})
		);
	},
	updateCirc(point) {
		set(
			produce((draft: IStore) => {
				const curIndex = draft.circs.length - 1;
				const rad = point!.y - draft.circs[curIndex].startY;
				draft.circs[curIndex].radius = rad < 0 ? 0 : rad;
			})
		);
	},

	clearShapes() {
		set({
			lines: [],
			recs: [],
			circs: [],
		});
	},
});

export default shapeStore;
