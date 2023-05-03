import { Routes, Route } from "react-router-dom";
import type { FC } from "react";

import Home from "./Home";
import * as Pages from "../pages";

export const AppRoutes: FC = () => (
	<Routes>
		<Route element={<Home />} path="/" />
		<Route>
			<Pages.NotFoundPage />
		</Route>
	</Routes>
);
