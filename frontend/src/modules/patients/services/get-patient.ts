import { Get } from "@/common/services/base";
import { IPatient } from "@/patients/models";
import { IServiceResponse } from "@/common/models";

export async function GetPatient(id: string): Promise<IServiceResponse<IPatient>> {
	const result = await Get<IPatient>({
		route: `patients/${id}`,
		defaultErrorMessage: "Failed to retrieve patient.",
	});

	return result;
};
