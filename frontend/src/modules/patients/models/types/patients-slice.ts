import { IPatient, ISummarizedPatient } from "@/patients/models";

export type PatientsSlice = {
	patients: ISummarizedPatient[];
	isLoading: boolean;
	currentPatient: IPatient | null;
	isLoadingCurrentPatient: boolean;
	setPatients: (patients: ISummarizedPatient[]) => void;
	setCurrentPatient: (patient: IPatient) => void;
	setIsLoading: (isLoading: boolean) => void;
	setIsLoadingCurrentPatient: (isLoading: boolean) => void;
	clearSearch: () => void;
};
