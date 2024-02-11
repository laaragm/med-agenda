import { Post } from "@/common/services";
import { IServiceResponse } from "@/common/models";
import { CreatePatientRequest, IPatient } from "@/patients/models";

export async function CreatePatient(body: CreatePatientRequest): Promise<IServiceResponse<IPatient>> {
	const result = await Post<IPatient>({
		route: "patients",
		defaultErrorMessage: "Não foi possível criar o paciente",
		body: JSON.stringify(body),
	});

	return result;
};
