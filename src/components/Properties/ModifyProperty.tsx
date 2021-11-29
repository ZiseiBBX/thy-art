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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IProperty } from "../../interfaces/property.interface";
import Tools from "../../interfaces/tools.interface";
import useStore from "../../store/store";
import PropertyInput from "./PropertyInput";
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
	const modifyRectangleColor = useStore((state) => state.modifyRectangleColor);
	const modifyRectangleWidth = useStore((state) => state.modifyRectangleWidth);
	const modifyCircleColor = useStore((state) => state.modifyCircleColor);
	const modifyCircleWidth = useStore((state) => state.modifyCircleWidth);

	return (
		<Popover>
			<PopoverTrigger>
				<Button>Properties</Button>
			</PopoverTrigger>
			<PopoverContent>
				<PopoverArrow />
				<PopoverCloseButton />
				<PopoverHeader>{tool} Properties</PopoverHeader>
				<PopoverBody>
					<Stack>
						<Stack direction="row" alignItems="center">
							<Text>Color</Text>
							{tool === Tools.BRUSH && <PropertyInput properties={brushProperties} modify={modifyBrushColor} />}
							{tool === Tools.ERASER && <PropertyInput properties={eraserProperties} modify={modifyEraserColor} />}
							{tool === Tools.RECTANGLE && (
								<PropertyInput properties={rectangleProperties} modify={modifyRectangleColor} />
							)}
							{tool === Tools.CIRCLE && <PropertyInput properties={circleProperties} modify={modifyCircleColor} />}
						</Stack>
						<Stack direction="row" alignItems="center">
							<Text>Stroke Width</Text>
							{tool === Tools.BRUSH && <PropertySlider properties={brushProperties} modify={modifyBrushWidth} />}
							{tool === Tools.ERASER && <PropertySlider properties={eraserProperties} modify={modifyEraserWidth} />}
							{tool === Tools.CIRCLE && <PropertySlider properties={circleProperties} modify={modifyCircleWidth} />}
							{tool === Tools.RECTANGLE && <PropertySlider properties={rectangleProperties} modify={modifyRectangleWidth} />}
						</Stack>
					</Stack>
				</PopoverBody>
			</PopoverContent>
		</Popover>
	);
}



export default ModifyProperty;
