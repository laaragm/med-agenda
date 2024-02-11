import { Get } from "@/common/services";
import { IServiceResponse } from "@/common/models";
import { isStringNullOrEmpty } from "@/common/utils";
import { ISummarizedPatient } from "@/patients/models";

export async function GetPatients(name?: string, includeReferences?: boolean): Promise<IServiceResponse<ISummarizedPatient[]>> {
	const result = await Get<ISummarizedPatient[]>({
		route: isStringNullOrEmpty(name) ? "patients" : `patients?name=${name}&includeReferences=${!!includeReferences}`,
		defaultErrorMessage: "Não foi possível recuperar os dados dos pacientes",
	});

	return result;
};
