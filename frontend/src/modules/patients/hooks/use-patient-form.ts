import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreatePatientRequest, MedicalState } from "@/patients/models";
import { useCreatePatient } from "@/patients/hooks";
import { handleResponse } from "@/modules/common/utils";

const formSchema = z.object({
	name: z.string().min(3, { message: "O nome precisa de ter pelo menos 3 caracteres." }),
	medicalStateCode: z.string(),
	isTermSigned: z.string(),
	referenceId: z.string().optional(),
	periodicityInDays: z.string().optional(),
	phoneNumber: z.string().optional(),
});

type Form = z.infer<typeof formSchema>;

export function usePatientForm(onOpenChange: (isOpen: boolean) => void, initialData?: Form) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { mutation: create } = useCreatePatient();
	const form = useForm<Form>({
		resolver: zodResolver(formSchema),
		defaultValues: !!initialData
			? { ...initialData, isTermSigned: String(initialData.isTermSigned), medicalStateCode: String(initialData.medicalStateCode) }
			: {
				name: "",
				medicalStateCode: String(MedicalState.Normal),
				isTermSigned: "false",
				referenceId: "",
				periodicityInDays: undefined,
				phoneNumber: undefined,
			}
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log("submitting form: ", values);
		setIsSubmitting(true);
		const patient = {
			...values,
			medicalStateCode: Number(values.medicalStateCode),
			isTermSigned: values.isTermSigned === "true",
			periodicityInDays: values.periodicityInDays ? Number(values.periodicityInDays) : undefined,
		} as CreatePatientRequest;
		const response = await create.mutateAsync(patient);
		if (!response.error) {
            onClose();
        }
		setIsSubmitting(false);
        handleResponse(response);
	}

	const onClose = () => {
		form.reset();
		onOpenChange(false);
	}

	return { form, isSubmitting, onSubmit, onClose };
}
