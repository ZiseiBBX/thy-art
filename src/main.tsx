import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { enablePatches } from "immer";
import { useStrictMode } from 'react-konva';
import theme from "./theme";

useStrictMode(true);
enablePatches();

ReactDOM.render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
