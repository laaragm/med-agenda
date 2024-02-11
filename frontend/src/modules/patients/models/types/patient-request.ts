export type UpdatePatientRequest = {
	id: string;
	name: string;
	medicalStateCode: number;
	isTermSigned: boolean;
	referenceId?: string;
	periodicityInDays?: number;
	phoneNumber?: string;
};

export type CreatePatientRequest = Omit<UpdatePatientRequest, "id">;
