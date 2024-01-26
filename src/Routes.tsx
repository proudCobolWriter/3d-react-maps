import { Routes, Route } from "react-router-dom";
import type { FC } from "react";

import * as Pages from "./pages";

// use caseSensitive for some routes
export const AppRoutes: FC = () => (
	<Routes>
		<Route path="/" element={<Pages.Home />} />
		<Route path="/rat" element={<Pages.RatPage />} />
		<Route path="*" element={<Pages.NotFoundPage />} />
	</Routes>
);
