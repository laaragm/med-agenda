export interface IPatient {
	id: string;
	name: string;
	medicalStateCode: number;
	isTermSigned: boolean;
	reference: string;
	periodicityInDays?: number;
	phoneNumber?: string;
}

export interface ISummarizedPatient {
	id: string;
	name: string;
	reference: string;
	isTermSigned: boolean;
}
