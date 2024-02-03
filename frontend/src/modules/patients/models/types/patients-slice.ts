import { ISummarizedPatient } from "..";

export type PatientsSlice = {
	patients: ISummarizedPatient[];
	isLoading: boolean;
	setPatients: (patients: ISummarizedPatient[]) => void;
	setIsLoading: (isLoading: boolean) => void;
	clearSearch: () => void;
};
