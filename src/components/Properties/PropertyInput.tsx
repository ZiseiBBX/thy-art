import { Input } from "@chakra-ui/react";
import { IProperty, ShapeType } from "../../interfaces/property.interface";

interface IPropertyInputProps {
	value: string;
	modify(color: string): void;
}

function PropertyInput(props: IPropertyInputProps) {
	return (
		<Input
			value={props.value}
			type="color"
			onChange={(e) => {
				props.modify(e.target.value);
			}}
		/>
	);
}

export default PropertyInput