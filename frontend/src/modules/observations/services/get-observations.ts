import { Get } from "@/common/services";
import { IObservation } from "@/observations/models";
import { FieldValidator, IServiceResponse } from "@/common/models";


export async function GetObservations(patientId?: string): Promise<IServiceResponse<IObservation[]>> {
	FieldValidator.validate(patientId, 'Patient ID');

	const result = await Get<IObservation[]>({
		route: `observations?patientId=${patientId}`,
		defaultErrorMessage: "Não foi possível recuperar as observações do paciente",
	});

	return result;
};
