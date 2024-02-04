import { useState } from "react";

import { IPatient } from "@/patients/models";

export function usePatientForm(initialData: IPatient = {} as IPatient) {
  const [data, setData] = useState(initialData);

  const onChange = (target: HTMLInputElement | HTMLTextAreaElement, overridesKey: keyof typeof data) => {
    let value: string | boolean | number;
    switch(typeof data[overridesKey]){
      case "string":
        value = String(target.value);
        break;
      case "number":
        value = +target.value;
        break;
      case "boolean":
        value = !data[overridesKey] ?? true;
        break;
      default:
        value = '';
    }

    setData(state => ({ ...state, [overridesKey]: value }));
  };

  const onResetForm = (values: IPatient = {} as IPatient) => {
    setData(values);
  };

  return { data, onResetForm, onChange };
}
