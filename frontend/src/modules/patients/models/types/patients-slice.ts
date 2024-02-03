import { ISummarizedPatient } from "@/patients/models";

export type PatientsSlice = {
	patients: ISummarizedPatient[];
	isLoading: boolean;
	setPatients: (patients: ISummarizedPatient[]) => void;
	setIsLoading: (isLoading: boolean) => void;
	clearSearch: () => void;
};
