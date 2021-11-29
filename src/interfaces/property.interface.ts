export interface IProperty {
  strokeColor: string
  width: number
}

export interface IBrushProperty extends IProperty {}
export interface IEraserProperty extends IProperty {}

export interface IRectangleProperty extends IProperty {
  type: ShapeType
  fillColor: string
}
export interface ICircleProperty extends IProperty {
  type: ShapeType
  fillColor: string
}

export type ShapeType = "stroke" | "fill" | "both"
