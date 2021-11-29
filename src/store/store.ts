import create from "zustand";
import propertyStore, { IPropertyStore } from "./property.store";

export interface IStore extends IPropertyStore {
  tool: string
  changeTool(tool: string): void
}

const useStore = create<IStore>((set, get) => ({
  tool: "",
  changeTool: (tool) => set({ tool }),

  ...propertyStore(set, get)
}))

export default useStore