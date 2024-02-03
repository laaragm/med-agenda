export interface IPatient {
	id: string;
	name: string;
	medicalStateCode: number;
	isTermSigned: boolean;
	periodicityInDays: number;
	phoneNumber: string;
	reference: string;
}

export interface ISummarizedPatient {
	id: string;
	name: string;
	reference: string;
	isTermSigned: boolean;
}
