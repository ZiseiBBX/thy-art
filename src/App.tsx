import {
	Flex,
	Box,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Button,
	Text,
	Divider,
	Spacer,
	Input
} from "@chakra-ui/react";
import useMeasure from "react-use-measure";
import ModifyProperty from "./components/Properties/ModifyProperty";
import Tile from "./components/Tile";
import Tools from "./interfaces/tools.interface";
import Canvas from "./pages/Canvas";
import useStore from "./store/store";

function App() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const tool = useStore((state) => state.tool);
	const changeTool = useStore((state) => state.changeTool);
	const clearShapes = useStore(state => state.clearShapes);

	const [ref, bounds] = useMeasure()

	const brushProperties = useStore((state) => state.brushProperties);
	const eraserProperties = useStore((state) => state.eraserProperties);
	const rectangleProperties = useStore((state) => state.rectangleProperties);
	const circleProperties = useStore((state) => state.circleProperties);

	return (
		<Flex height="100vh" width="100%" overflow="hidden">
			<Box>
				<Flex flexDirection="column" justifyContent="center" alignItems="center" width="160px" height="100%">
					<Text mt={4} mb={4} fontSize="1.3rem" fontWeight="700">Thy Art</Text>
					<Tile content="Brush" tool={Tools.BRUSH} onClick={() => changeTool(Tools.BRUSH)} />
					{/* <Tile content="Eraser" tool={Tools.ERASER} onClick={() => changeTool("Eraser")} /> */}
					<Tile content="Rectangle" tool={Tools.RECTANGLE} onClick={() => changeTool(Tools.RECTANGLE)} />
					<Tile content="Circle" tool={Tools.CIRCLE} onClick={() => changeTool(Tools.CIRCLE)} />
					<Divider />
					<Tile content="Delete Shape" tool={Tools.DELETE} onClick={() => changeTool(Tools.DELETE)} />
					<Spacer />
					{tool !== Tools.DELETE && <Tile content={`${tool} Properties`} onClick={onOpen}></Tile>}
					<Tile content="Clear" onClick={clearShapes} />
					<Box mt={10}></Box>
				</Flex>
			</Box>
			<Box ref={ref} sx={{ backgroundColor: "white" }} height="100%" width="100%">
				<Canvas height={bounds.height} width={bounds.width} />
			</Box>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{tool} Properties</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<ModifyProperty />
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Flex>
	);
}

export default App;
