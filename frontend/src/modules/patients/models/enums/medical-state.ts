export enum MedicalState {
    Normal = 1,
    Priority = 2,
    Critical = 3
}

export function getMedicalStateName(code: MedicalState) {
    const name = MedicalState[code];
    if (!name) {
        throw new Error(`No MedicalState found for code ${code}`);
    }
    return name;
}
