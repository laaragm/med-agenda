import { useState } from "react";

import { Button } from "@/common/components";
import { handleResponse } from "@/common/utils";
import { ObservationsDialog } from "@/observations/components";
import { IPatient, getMedicalStateName } from "@/patients/models";
import { PatientFormDialog } from "./patient-form-dialog";
import { useDeletePatient } from "../hooks/use-delete-patient";

type PatientDetailsProps = {
	patient: IPatient;
}

type Dialog = "patient" | "observations" | undefined;

const Item = ({ label, data }: { label: string, data: string | number | undefined }) => (
	<span className="flex flex-row gap-1 text-base">
		<span className="font-bold">{label}:</span> {!!data ? data : "Não informado"}
	</span>
);

export function PatientDetails({ patient }: PatientDetailsProps) {
	const [dialog, setDialog] = useState<Dialog>(undefined);
	const [isLoading, setIsLoading] = useState(false);
	const { mutation } = useDeletePatient();

	const handleEdit = () => {
		setDialog("patient");
	}

	const handleCloseDialog = () => {
		setDialog(undefined);
	}

	const handleShowObservations = () => {
		setDialog("observations");
	}

	const handleDelete = async () => {
		setIsLoading(true);
		const response = await mutation.mutateAsync(patient.id);
		setIsLoading(false);
		handleResponse(response);
	}

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
					<Button size="small" className="w-fit" onClick={handleShowObservations}>Exibir observações</Button>
					<Button variant="contained-danger" loading={isLoading} className="w-fit" size="small" onClick={handleDelete}>Excluir paciente</Button>
				</div>
			</div>

			{dialog === "patient" && <PatientFormDialog initialData={patient} onOpenChange={handleCloseDialog} />}

			{dialog === "observations" && (
				<ObservationsDialog patientId={patient.id} patientName={patient.name} onOpenChange={handleCloseDialog} />
			)}
		</>
	);
}
