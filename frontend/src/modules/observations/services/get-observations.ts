import { Get } from "@/common/services";
import { IServiceResponse } from "@/common/models";
import { IObservation } from "@/observations/models";


export async function GetObservations(patientId: string): Promise<IServiceResponse<IObservation[]>> {
	const result = await Get<IObservation[]>({
		route: `observations?patientId=${patientId}`,
		defaultErrorMessage: "Não foi possível recuperar as observações do paciente",
	});

	return result;
};
