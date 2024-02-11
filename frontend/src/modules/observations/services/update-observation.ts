import { Patch } from "@/common/services";
import { IServiceResponse } from "@/common/models";
import { IObservation, UpdateObservationRequest } from "@/observations/models";

export async function UpdateObservation(id: string, body: UpdateObservationRequest): Promise<IServiceResponse<IObservation>> {
	const result = await Patch<IObservation>({
		route: `observations/${id}`,
		defaultErrorMessage: "Não foi possível editar a observação",
		body: JSON.stringify(body),
	});

	return result;
};
