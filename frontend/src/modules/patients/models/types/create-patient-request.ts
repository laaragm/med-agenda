export type CreatePatientRequest = {
	name: string;
	medicalStateCode: number;
	isTermSigned: boolean;
	referenceId?: string;
	periodicityInDays?: number;
	phoneNumber?: string;
};
