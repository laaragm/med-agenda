import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import { LayoutWrapper, Loadable } from "@/common/components";
import { PATHS } from "./paths";

const Patients = Loadable(lazy(() => import("../pages/patients")));

export const router = createBrowserRouter([
	{
		element: <LayoutWrapper />,
		children: [
			{
				path: PATHS.patients.route,
				element: Patients,
			},
		],
	},
]);
