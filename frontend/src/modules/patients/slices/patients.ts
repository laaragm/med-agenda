import { StateCreator } from "zustand";

import { PatientsSlice } from "@/patients/models";

export const createPatientsSlice: StateCreator<PatientsSlice> = (set) => ({
	patients: [],
	isLoading: false,

	setPatients: (patients) => set(() => ({ patients })),
	setIsLoading: (isLoading) => set(() => ({ isLoading })),
	clearSearch: () => set(_ => ({ patients: [], isLoading: true }))
});
