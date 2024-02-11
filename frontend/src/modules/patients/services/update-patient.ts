import { IPatient } from "@/patients/models";
import { Patch } from "@/common/services/base";
import { IServiceResponse } from "@/common/models";

type UpdatePatientRequest = {
	id: string;
	name: string;
	medicalStateCode: number;
	isTermSigned: boolean;
	referenceId?: string;
	periodicityInDays?: number;
	phoneNumber?: string;
};

export async function UpdatePatient(body: UpdatePatientRequest): Promise<IServiceResponse<IPatient>> {
	const result = await Patch<IPatient>({
		route: "patients",
		defaultErrorMessage: "Failed to update patient.",
		body: JSON.stringify(body),
	});

	return result;
};
