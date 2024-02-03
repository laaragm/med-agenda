import { useState } from "react";

import { Button, Page } from "@/common/components";
import { PatientSearch } from "@/patients/components";

export function PatientsView() {
	const [value, setValue] = useState('');
	const [selected, setSelected] = useState(false);

	return (
		<Page className="px-5 mt-10">
			<div className="flex flex-row w-full items-start justify-between gap-5">
				<div className="w-[70%]">
					<PatientSearch value={value} includeReferences={selected} onSearch={(val) => console.log(val)} onChangeIncludeReferences={(checked) => setSelected(checked)} />
				</div>
				<div className="ml-auto">
					<Button className="px-12" onClick={() => console.log('clicked!')}>Adicionar</Button>
				</div>
			</div>
		</Page>
	);
}
