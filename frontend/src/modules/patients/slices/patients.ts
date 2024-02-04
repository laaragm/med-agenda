import { StateCreator } from "zustand";

import { PatientsSlice } from "@/patients/models";

export const createPatientsSlice: StateCreator<PatientsSlice> = (set) => ({
	patients: [],
	isLoading: false,
	currentPatient: null,
	isLoadingCurrentPatient: false,

	setPatients: (patients) => set(() => ({ patients })),
	setCurrentPatient: (currentPatient) => set(() => ({ currentPatient })),
	setIsLoading: (isLoading) => set(() => ({ isLoading })),
	setIsLoadingCurrentPatient: (isLoadingCurrentPatient) => set(() => ({ isLoadingCurrentPatient })),
	clearSearch: () => set(_ => ({ patients: [], isLoading: true })),
});
