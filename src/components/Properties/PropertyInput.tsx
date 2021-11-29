import { Input } from "@chakra-ui/react";
import { IProperty } from "../../interfaces/property.interface";

interface IPropertyInputProps {
	properties: IProperty;
	modify(color: string): void;
}

function PropertyInput(props: IPropertyInputProps) {
	return (
		<Input
			value={props.properties.color}
			type="color"
			onChange={(e) => {
				props.modify(e.target.value);
			}}
		/>
	);
}

export default PropertyInput