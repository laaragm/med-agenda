import { Post } from "@/common/services";
import { IServiceResponse } from "@/common/models";
import { CreateObservationRequest } from "@/observations/models";

export async function CreateObservation(body: CreateObservationRequest): Promise<IServiceResponse<string>> {
	const result = await Post<string>({
		route: "observations",
		defaultErrorMessage: "Não foi possível criar a observação",
		body: JSON.stringify(body),
	});

	return result;
};
