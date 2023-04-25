import { Routes, Route } from "react-router-dom";
import type { FC } from "react";

import Home from "./Home";

export const AppRoutes: FC = () => (
	<Routes>
		<Route element={<Home />} path="/" />
	</Routes>
);
