import {
	Flex,
	Box,
	Input,
	Stack,
	Text,
	Button,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverFooter,
	PopoverArrow,
	PopoverCloseButton,
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
	RadioGroup,
	Radio,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IProperty, ShapeType } from "../../interfaces/property.interface";
import Tools from "../../interfaces/tools.interface";
import useStore from "../../store/store";
import PropertyInput from "./PropertyInput";
import PropertyRadio from "./PropertyRadio";
import PropertySlider from "./PropertySlider";

function ModifyProperty() {
	const tool = useStore((state) => state.tool);

	const brushProperties = useStore((state) => state.brushProperties);
	const eraserProperties = useStore((state) => state.eraserProperties);
	const rectangleProperties = useStore((state) => state.rectangleProperties);
	const circleProperties = useStore((state) => state.circleProperties);

	const modifyBrushColor = useStore((state) => state.modifyBrushColor);
	const modifyBrushWidth = useStore((state) => state.modifyBrushWidth);

	const modifyEraserColor = useStore((state) => state.modifyEraserColor);
	const modifyEraserWidth = useStore((state) => state.modifyEraserWidth);

	const modifyRectangleStrokeColor = useStore((state) => state.modifyRectangleStrokeColor);
	const modifyRectangleFillColor = useStore((state) => state.modifyRectangleFillColor);
	const modifyRectangleWidth = useStore((state) => state.modifyRectangleWidth);
	const modifyRectangleType = useStore((state) => state.modifyRectangleType);

	const modifyCircleStrokeColor = useStore((state) => state.modifyCircleStrokeColor);
	const modifyCircleFillColor = useStore((state) => state.modifyCircleFillColor);
	const modifyCircleWidth = useStore((state) => state.modifyCircleWidth);
	const modifyCircleType = useStore((state) => state.modifyCircleType);

	return (
		<Popover>
			<PopoverTrigger>
				<Button>P</Button>
			</PopoverTrigger>
			<PopoverContent>
				<PopoverArrow />
				<PopoverCloseButton />
				<PopoverHeader>{tool} Properties</PopoverHeader>
				<PopoverBody>
					<Stack>
						<Stack direction="row" alignItems="center">
							<Text>Stroke Color</Text>
							{tool === Tools.BRUSH && <PropertyInput value={brushProperties.strokeColor} modify={modifyBrushColor} />}
							{tool === Tools.ERASER && <PropertyInput value={eraserProperties.strokeColor} modify={modifyEraserColor} />}
							{tool === Tools.RECTANGLE && (
								<PropertyInput value={rectangleProperties.strokeColor} modify={modifyRectangleStrokeColor} />
							)}
							{tool === Tools.CIRCLE && (
								<PropertyInput value={circleProperties.strokeColor} modify={modifyCircleStrokeColor} />
							)}
						</Stack>
						{(tool === Tools.CIRCLE || tool === Tools.RECTANGLE) && (
							<Stack direction="row" alignItems="center">
								<Text>Fill Color</Text>
								{tool === Tools.RECTANGLE && (
									<PropertyInput value={rectangleProperties.fillColor} modify={modifyRectangleFillColor} />
								)}
								{tool === Tools.CIRCLE && (
									<PropertyInput value={circleProperties.fillColor} modify={modifyCircleFillColor} />
								)}
							</Stack>
						)}
						<Stack direction="row" alignItems="center">
							<Text>Stroke Width</Text>
							{tool === Tools.BRUSH && <PropertySlider properties={brushProperties} modify={modifyBrushWidth} />}
							{tool === Tools.ERASER && <PropertySlider properties={eraserProperties} modify={modifyEraserWidth} />}
							{tool === Tools.CIRCLE && <PropertySlider properties={circleProperties} modify={modifyCircleWidth} />}
							{tool === Tools.RECTANGLE && (
								<PropertySlider properties={rectangleProperties} modify={modifyRectangleWidth} />
							)}
						</Stack>
						{tool === Tools.RECTANGLE && <PropertyRadio value={rectangleProperties.type} modify={modifyRectangleType} />}
						{tool === Tools.CIRCLE && <PropertyRadio value={circleProperties.type} modify={modifyCircleType} />}
					</Stack>
				</PopoverBody>
			</PopoverContent>
		</Popover>
	);
}

export default ModifyProperty;
