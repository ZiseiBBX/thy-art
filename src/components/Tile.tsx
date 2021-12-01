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
			isFullWidth
			_focus={{ boxShadow: "none" }}
			sx={{
				borderRadius: 0,
				backgroundColor: active && "red",
			 }}
			variant="ghost"
			onClick={props.onClick}
		>
			{props.content}
		</Button>
	);
}

export default Tile;
