export type CreatePatientRequest = {
	name: string;
	medicalStateCode: number;
	isTermSigned: boolean;
	referencePatientId?: string;
	periodicityInDays?: number;
	phoneNumber?: string;
};
