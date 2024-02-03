import { PatientRow } from ".";

export function PatientList() {
	return (
		<div className="flex flex-col w-full">
			<PatientRow patient={{ id: "1", name: "Ana da Silva", reference: "Maria Clara Silva", isTermSigned: true }} />
			<PatientRow patient={{ id: "2", name: "João Mendes", reference: "Maria Clara Silva", isTermSigned: true }} />
			<PatientRow patient={{ id: "3", name: "Katia Pereira Lima", reference: "Fernanda Lima", isTermSigned: false }} />
			<PatientRow patient={{ id: "4", name: "Lara Galvani", reference: "Daniela Galvani", isTermSigned: true }} />
			<PatientRow patient={{ id: "5", name: "Maria Clara Silva", reference: "", isTermSigned: true }} />
		</div>
	);
}
