export function PatientListSkeletonLoading() {
	const items = Array.from({ length: 12 });

	return (
	  <div role="status" className="animate-pulse flex flex-col gap-3">
		{items.map((_, index) => (
		  <div key={index} className="h-12 bg-gray-200 rounded-md"></div>
		))}
		<span className="sr-only">Loading...</span>
	  </div>
	);
  }
