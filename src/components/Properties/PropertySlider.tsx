import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "@chakra-ui/react";
import { IProperty } from "../../interfaces/property.interface";

interface IPropertySliderProps {
	properties: IProperty;
	modify(width: number): void;
}

function PropertySlider(props: IPropertySliderProps) {
	return (
		<Slider
			value={props.properties.width}
			min={1}
			max={50}
			onChange={(val) => {
				props.modify(val);
			}}
		>
			<SliderTrack>
				<SliderFilledTrack />
			</SliderTrack>
			<SliderThumb />
		</Slider>
	);
}

export default PropertySlider