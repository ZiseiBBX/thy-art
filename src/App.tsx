import { Flex, Box } from "@chakra-ui/react";
import { useRef } from "react";
import { useImmer } from "use-immer";
import ModifyProperty from "./components/Properties/ModifyProperty";
import Tile from "./components/Tile";
import { ICanvasState } from "./interfaces/shape.interface";
import Tools from "./interfaces/tools.interface";
import Canvas from "./pages/Canvas";
import useStore from "./store/store";

function App() {
	const changeTool = useStore((state) => state.changeTool);

	return (
		<Flex height="100vh" width="100%" overflow="hidden">
			<Box>
				<Flex flexDirection="column">
					<Tile content="B" tool={Tools.BRUSH} onClick={() => changeTool("Brush")} />
					<Tile content="E" tool={Tools.ERASER} onClick={() => changeTool("Eraser")} />
					<Tile content="R" tool={Tools.RECTANGLE} onClick={() => changeTool("Rectangle")} />
					<Tile content="C" tool={Tools.CIRCLE} onClick={() => changeTool("Circle")} />
				</Flex>
			</Box>
			<Canvas />
		</Flex>
	);
}

export default App;
