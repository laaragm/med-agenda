import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClientProvider } from "@tanstack/react-query";

import { Spinner } from "@/common/components";
import { queryClient } from "@/common/services";
import { router } from "./routes";

export default function App() {
  	return (
		<div className="bg-backgroundColor">
			<HelmetProvider>
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} fallbackElement={<Spinner className="w-12 h-12" />} />
				</QueryClientProvider>
			</HelmetProvider>
		</div>
  	)
}
