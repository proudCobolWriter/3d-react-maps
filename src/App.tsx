import { type FC } from "react";

import * as Layouts from "./Layouts";

// Assets

import "./App.css";

const App: FC = () => (
	<>
		<Layouts.Header />
		<Layouts.Main />
		<Layouts.Footer />
	</>
);

export default App;
