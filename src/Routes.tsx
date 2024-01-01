import { Routes, Route } from "react-router-dom";
import type { FC } from "react";

import * as Pages from "./pages";

export const AppRoutes: FC = () => (
	<Routes>
		<Route path="/" element={<Pages.Home />} />
		<Route path="*" element={<Pages.NotFoundPage />} />
	</Routes>
);
