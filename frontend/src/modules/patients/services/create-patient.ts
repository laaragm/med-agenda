import { IPatient } from "@/patients/models";
import { Post } from "@/common/services/base";
import { IServiceResponse } from "@/common/models";

type CreatePatientRequest = {
	name: string;
	medicalStateCode: number;
	isTermSigned: boolean;
	referencePatientId?: string;
	periodicityInDays?: number;
	phoneNumber?: string;
};

export async function CreatePatient(body: CreatePatientRequest): Promise<IServiceResponse<IPatient>> {
	const result = await Post<IPatient>({
		route: "patients",
		defaultErrorMessage: "Failed to create patient.",
		body: JSON.stringify(body),
	});

	return result;
};
