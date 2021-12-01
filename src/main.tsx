import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { enablePatches } from "immer";
import { useStrictMode } from 'react-konva';

useStrictMode(true);
enablePatches();

ReactDOM.render(
	<React.StrictMode>
		<ChakraProvider>
			<App />
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
