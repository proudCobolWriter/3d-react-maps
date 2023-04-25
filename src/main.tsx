import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import App from "./App";
import "./basic-styling.css";

const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);

const helmetContext = {};

root.render(
	<StrictMode>
		<HelmetProvider context={helmetContext}>
			<Router>
				<App />
			</Router>
		</HelmetProvider>
	</StrictMode>
);
