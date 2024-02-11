import { Suspense } from "react";
import { Spinner } from "./spinner";

export const Loadable = (Component: React.LazyExoticComponent<React.ComponentType>) => {
	return (
		<Suspense fallback={<Spinner className="w-12 h-12 fixed top-2/4 left-2/4" />}>
			<Component />
		</Suspense>
	);
};
