import { PatientRow } from "@/patients/components";
import { ISummarizedPatient } from "@/patients/models";

type PatientListProps = {
	patients: ISummarizedPatient[];
}

export function PatientList({ patients }: PatientListProps) {
	return (
		<div className="flex flex-col w-full">
			{/* {patients.map((patient) => <PatientRow key={patient.id} patient={patient} />)} */}

			<PatientRow patient={{ id: "1", name: "Ana da Silva", reference: "Maria Clara Silva", isTermSigned: true }} />
			<PatientRow patient={{ id: "2", name: "João Mendes", reference: "Maria Clara Silva", isTermSigned: true }} />
			<PatientRow patient={{ id: "3", name: "Katia Pereira Lima", reference: "Fernanda Lima", isTermSigned: false }} />
			<PatientRow patient={{ id: "4", name: "Lara Galvani", reference: "Daniela Galvani", isTermSigned: true }} />
			<PatientRow patient={{ id: "5", name: "Maria Clara Silva", reference: "", isTermSigned: true }} />
		</div>
	);
}
