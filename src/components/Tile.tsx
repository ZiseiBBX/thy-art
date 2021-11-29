import { Button } from "@chakra-ui/react";
import useStore from "../store/store";

interface ITileProps {
	content: string;
	tool?: string;
	onClick?(): void;
}

function Tile(props: ITileProps) {
	const tool = useStore((state) => state.tool);
	const active = tool === props.tool;

	return (
		<Button
			style={{
				borderRadius: 0,
				border: "1px solid white"
			}}
			onClick={props.onClick}
		>
			{props.content}
		</Button>
	);
}

export default Tile;
