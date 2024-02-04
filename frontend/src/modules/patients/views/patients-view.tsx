import { useStore } from "@/store";
import { usePatientSearch } from "@/patients/hooks";
import { Button, Page, Spinner } from "@/common/components";
import { PatientList, PatientSearch } from "@/patients/components";
import Illustration from "@/assets/main-illustration.svg";

export function PatientsView() {
	const { onSearch, onClear  } = usePatientSearch();
	const { patients, isLoading } = useStore();

	return (
		<Page className="px-5 mt-10 gap-6">
			<div className="flex flex-row w-full items-start justify-between gap-5">
				<div className="w-[70%]">
					<PatientSearch onSearch={onSearch} onClear={onClear} />
				</div>
				<div className="ml-auto">
					<Button className="md:px-12" onClick={() => console.log('clicked!')}>Adicionar</Button>
				</div>
			</div>

			<div className="flex flex-row w-full h-full gap-6">
				<div className="w-full md:w-[70%]">
					{isLoading ? <Spinner className="w-12 h-12" /> : <PatientList patients={patients} />}
				</div>
				<img
					src={Illustration}
					alt="Illustration"
					className="invisible md:visible aspect-w-1 aspect-h-1 md:aspect-w-4 md:aspect-h-3 animate-bounce-in-right fixed bottom-0 right-0 max-w-full h-auto"
				/>
			</div>
		</Page>
	);
}
