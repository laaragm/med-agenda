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
	referencePatientId: z.string().optional(),
	periodicityInDays: z.string().optional(),
	phoneNumber: z.string().optional(),
});

export function usePatientForm<T extends Object>(onOpenChange: (isOpen: boolean) => void, initialData?: T) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { mutation: create } = useCreatePatient();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: !!initialData
			? initialData
			: {
				name: "",
				medicalStateCode: String(MedicalState.Normal),
				isTermSigned: "false",
				referencePatientId: "",
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
