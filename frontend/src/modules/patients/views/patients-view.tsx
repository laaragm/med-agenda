import { Button, Page } from "@/common/components";
import { usePatientSearch } from "@/patients/hooks";
import { PatientList, PatientSearch } from "@/patients/components";
import { useStore } from "@/store";

export function PatientsView() {
	const { includeReferences, onChangeIncludeReferences, onSearch  } = usePatientSearch();
	const { patients, isLoading } = useStore();

	return (
		<Page className="px-5 mt-10 gap-6">
			<div className="flex flex-row w-full items-start justify-between gap-5">
				<div className="w-[70%]">
					<PatientSearch
						includeReferences={includeReferences}
						onChangeIncludeReferences={onChangeIncludeReferences}
						onSearch={onSearch}
					/>
				</div>
				<div className="ml-auto">
					<Button className="md:px-12" onClick={() => console.log('clicked!')}>Adicionar</Button>
				</div>
			</div>

			<div className="flex flex-row w-full">
				<PatientList patients={patients} />
			</div>
		</Page>
	);
}
