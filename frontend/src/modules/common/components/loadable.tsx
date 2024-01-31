import { Suspense } from "react";
import { Spinner } from "./spinner";

export const Loadable = (Component: React.LazyExoticComponent<React.ComponentType>) => {
	return (
		<Suspense fallback={<Spinner className="w-12 h-12" />}>
			<Component />
		</Suspense>
	);
};
