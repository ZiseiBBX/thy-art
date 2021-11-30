import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { ShapeType } from "../../interfaces/property.interface";

interface IPropertyRadioProps {
  value: ShapeType
  modify(type: ShapeType): void
}

function PropertyRadio(props: IPropertyRadioProps) {
  return (
    <Stack direction="row" alignItems="center" width="100%">
      <RadioGroup
        onChange={(val: ShapeType) => props.modify(val)}
        value={props.value}
        width="100%"
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Radio value="stroke">Stroke</Radio>
          <Radio value="fill">Fill</Radio>
          <Radio value="both">Both</Radio>
        </Stack>
      </RadioGroup>
    </Stack>
  )
}

export default PropertyRadio
