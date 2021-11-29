export interface IProperty {
  color: string
  width: number
}

export interface IBrushProperty extends IProperty {}
export interface IEraserProperty extends IProperty {}

export interface IRectangleProperty extends IProperty {}
export interface ICircleProperty extends IProperty {}