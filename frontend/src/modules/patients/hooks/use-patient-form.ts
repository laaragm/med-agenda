import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { handleResponse } from "@/common/utils";
import { useCreatePatient, useUpdatePatient } from "@/patients/hooks";
import { CreatePatientRequest, MedicalState, UpdatePatientRequest } from "@/patients/models";

const formSchema = z.object({
	id: z.string().optional().nullable(),
	name: z.string().min(3, { message: "O nome precisa de ter pelo menos 3 caracteres." }),
	medicalStateCode: z.string(),
	isTermSigned: z.string(),
	referenceId: z.string().optional().nullable(),
	periodicityInDays: z.string().optional().nullable(),
	phoneNumber: z.string().optional().nullable(),
});

type Form = z.infer<typeof formSchema>;

export function usePatientForm(onOpenChange: (isOpen: boolean) => void, initialData?: Form) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { mutation: create } = useCreatePatient();
	const { mutation: update } = useUpdatePatient();
	const form = useForm<Form>({
		resolver: zodResolver(formSchema),
		defaultValues: !!initialData
			? {
				...initialData,
				isTermSigned: String(initialData.isTermSigned),
				medicalStateCode: String(initialData.medicalStateCode),
				periodicityInDays: !!initialData.periodicityInDays ? String(initialData.periodicityInDays) : undefined
			}
			: {
				id: undefined,
				name: "",
				medicalStateCode: String(MedicalState.Normal),
				isTermSigned: "false",
				referenceId: undefined,
				periodicityInDays: undefined,
				phoneNumber: undefined,
			}
	});

	const getData = (data: Form) => {
		return {
			...data,
			medicalStateCode: Number(data.medicalStateCode),
			isTermSigned: data.isTermSigned === "true",
			periodicityInDays: !!data.periodicityInDays ? Number(data.periodicityInDays?.replace(/[^0-9]/g, '')) : undefined,
		};
	}

	const onSubmit = async (values: Form) => {
		setIsSubmitting(true);
		const isUpdateOperation = !!initialData;
		let response;
		const patient = getData(values);
		if (isUpdateOperation) {
			response = await update.mutateAsync(patient as UpdatePatientRequest);
		} else {
			response = await create.mutateAsync(patient as CreatePatientRequest);
		}
		if (!response?.error) {
            onClose();
        }
		setIsSubmitting(false);
		if (!!response) {
			handleResponse(response);
		}
	}

	const onClose = () => {
		form.reset();
		onOpenChange(false);
	}

	return { form, isSubmitting, onSubmit, onClose };
}
