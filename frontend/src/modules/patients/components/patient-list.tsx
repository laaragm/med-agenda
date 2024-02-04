import { PatientRow } from "@/patients/components";
import { ISummarizedPatient } from "@/patients/models";

type PatientListProps = {
	patients: ISummarizedPatient[];
}

export function PatientList({ patients }: PatientListProps) {
	return (
		<div className="flex flex-col w-full">
			{patients.map((patient) => <PatientRow key={patient.id} patient={patient} />)}
		</div>
	);
}
