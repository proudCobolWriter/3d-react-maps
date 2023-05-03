import type { FC } from "react";

import { AppRoutes } from "./routes";
import { Header } from "./components";

const App: FC = () => (
	<div className="App">
		<Header />
		<AppRoutes />
	</div>
);

export default App;
