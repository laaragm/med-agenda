import { MsalAuthenticationTemplate, MsalProvider } from "@azure/msal-react";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { InteractionType } from "@azure/msal-browser";
import { QueryClientProvider } from "@tanstack/react-query";

import { router } from "@/routes";
import { Spinner } from "@/common/components";
import { queryClient } from "@/common/services";
import { AuthContextProvider } from "@/common/contexts";
import { graphLoginRequest, msalInstance } from "@/authentication";

const Loading = () => <div className="flex items-center justify-center w-screen h-screen"><Spinner className="w-12 h-12" /></div>;

export default function App() {
  	return (
		<div className="bg-backgroundColor">
			<MsalProvider instance={msalInstance}>
				<MsalAuthenticationTemplate
					interactionType={InteractionType.Redirect}
					authenticationRequest={graphLoginRequest}
					loadingComponent={Loading}
				>
					<AuthContextProvider>
						<HelmetProvider>
							<QueryClientProvider client={queryClient}>
								<RouterProvider router={router} fallbackElement={<Spinner className="w-12 h-12 fixed top-2/4 left-2/4" />} />
							</QueryClientProvider>
						</HelmetProvider>
					</AuthContextProvider>
				</MsalAuthenticationTemplate>
			</MsalProvider>
		</div>
  	)
}
