import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { enablePatches } from "immer";

enablePatches();

ReactDOM.render(
	<React.StrictMode>
		<ChakraProvider>
			<App />
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
