import { type FC } from "react";

import { AppRoutes } from "./Routes";
import { Header } from "./components";

const App: FC = () => (
	<>
		<Header />
		<AppRoutes />
	</>
);

export default App;
