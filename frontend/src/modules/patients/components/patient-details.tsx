import { useState } from "react";

import { Button } from "@/common/components";
import { IPatient, getMedicalStateName } from "@/patients/models";
import { PatientFormDialog } from ".";

type PatientDetailsProps = {
	patient: IPatient;
}

const Item = ({ label, data }: { label: string, data: string | number | undefined }) => (
	<span className="flex flex-row gap-1 text-base">
		<span className="font-bold">{label}:</span> {!!data ? data : "Não informado"}
	</span>
);

export function PatientDetails({ patient }: PatientDetailsProps) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleEdit = () => setIsDialogOpen(true);

	return (
		<>
			<div className="flex flex-col gap-3">
				<div className="grid grid-cols-2 gap-2">
					<Item label="Tipo" data={getMedicalStateName(patient.medicalStateCode)} />
					<Item label="Periodicidade" data={!!patient.periodicityInDays ? `${patient.periodicityInDays} dias` : undefined} />
					<Item label="Referência" data={patient.referenceName} />
					<Item label="Assinou termo" data={patient.isTermSigned ? "Sim" : "Não"} />
					<Item label="Telefone" data={patient.phoneNumber} />
				</div>
				<div className="flex flex-row gap-2">
					<Button variant="contained-tertiary" size="small" className="w-fit" onClick={handleEdit}>Editar paciente</Button>
					<Button size="small" className="w-fit" onClick={() => console.log("Show observations")}>Exibir observações</Button>
					<Button variant="contained-danger" className="w-fit" size="small" onClick={() => console.log("Delete")}>Excluir paciente</Button>
				</div>
			</div>

			<PatientFormDialog isOpen={isDialogOpen} initialData={patient} onOpenChange={setIsDialogOpen} />
		</>
	);
}
