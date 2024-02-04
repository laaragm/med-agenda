import { useStore } from "@/store";
import { Button, Page } from "@/common/components";
import { usePatientSearch } from "@/patients/hooks";
import { PatientList, PatientSearch } from "@/patients/components";
import Illustration from "@/assets/main-illustration.svg";

export function PatientsView() {
	const { filters, onChangeIncludeReferences, onSearch, onClear  } = usePatientSearch();
	const { patients, isLoading } = useStore();

	return (
		<Page className="px-5 mt-10 gap-6">
			<div className="flex flex-row w-full items-start justify-between gap-5">
				<div className="w-[70%]">
					<PatientSearch
						includeReferences={filters.includeReferences}
						onChangeIncludeReferences={onChangeIncludeReferences}
						onSearch={onSearch}
						onClear={onClear}
					/>
				</div>
				<div className="ml-auto">
					<Button className="md:px-12" onClick={() => console.log('clicked!')}>Adicionar</Button>
				</div>
			</div>

			<div className="flex flex-row w-full h-full gap-6">
				<div className="w-full md:w-[70%]">
					<PatientList patients={patients} />
				</div>
				<img src={Illustration} width={366} height={318} alt="Illustration" className="invisible md:visible ml-auto" />
			</div>
		</Page>
	);
}
