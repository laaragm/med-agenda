import { PatientRow } from "@/patients/components";
import { IPatient, ISummarizedPatient } from "@/patients/models";

type PatientListProps = {
	patients: ISummarizedPatient[];
	selectedPatient: IPatient | null;
	isLoadingCurrentPatient: boolean;
	onRequestDetails: (id: string) => void;
}

export function PatientList({ patients, selectedPatient, isLoadingCurrentPatient, onRequestDetails }: PatientListProps) {
	return (
		<div className="flex flex-col w-full">
			{patients.map((patient) => (
				<PatientRow
					key={patient.id}
					patient={patient}
					patientDetails={selectedPatient}
					isLoadingDetails={isLoadingCurrentPatient}
					onExpand={() => onRequestDetails(patient.id)}
				/>
			))}
		</div>
	);
}
