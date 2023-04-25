import ReactDOM from "react-dom/client";
import React from "react";

import * as Components from "./components/";
import "./basic-styling.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Components.App />
	</React.StrictMode>
);
