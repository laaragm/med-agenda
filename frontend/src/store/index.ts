import { create } from "zustand";

import { PatientsSlice } from "@/patients/models";
import { createPatientsSlice } from "@/patients/slices";

export const useStore = create<PatientsSlice>((...a) => ({
  ...createPatientsSlice(...a),
}));
