import create from "zustand";
import Tools from "../interfaces/tools.interface";
import propertyStore, { IPropertyStore } from "./property.store";
import shapeStore, { IShapeStore } from "./shape.store";

export interface IStore extends IPropertyStore, IShapeStore {
  tool: string
  changeTool(tool: string): void
}

const useStore = create<IStore>((set, get) => ({
  tool: Tools.BRUSH,
  changeTool: (tool) => {
    if (get().tool !== tool) set({ tool })
  },

  ...propertyStore(set, get),
  ...shapeStore(set, get)
}))

export const selectTool = (state: IStore) => state.tool

export default useStore