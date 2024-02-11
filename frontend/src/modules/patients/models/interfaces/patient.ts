export interface IPatient {
	id: string;
	name: string;
	medicalStateCode: number;
	isTermSigned: boolean;
	referenceId?: string;
	referenceName: string;
	periodicityInDays?: number;
	phoneNumber?: string;
}

export interface ISummarizedPatient {
	id: string;
	name: string;
	referenceName: string;
	isTermSigned: boolean;
}
