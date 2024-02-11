import { Patch } from "@/common/services";
import { IPatient } from "@/patients/models";
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
		route: `patients/${body.id}`,
		defaultErrorMessage: "Não foi possível atualizar os dados do paciente",
		body: JSON.stringify(body),
	});

	return result;
};
