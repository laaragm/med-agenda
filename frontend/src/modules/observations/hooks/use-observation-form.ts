import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { formatDate, handleResponse } from "@/common/utils";
import { CreateObservationRequest } from "@/observations/models";
import { useCreateObservation, useDeleteObservation } from "@/observations/hooks";

const formSchema = z.object({
	patientId: z.string(),
	message: z.string(),
	date: z.string().optional().nullable(),
});

export type Form = z.infer<typeof formSchema>;

type Step = "view" | "add";

export function useObservationForm(onOpenChange: (isOpen: boolean) => void, patientId: string) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { mutation: create } = useCreateObservation();
	const { mutation: deletion } = useDeleteObservation();
	const form = useForm<Form>({
		resolver: zodResolver(formSchema),
		defaultValues: { patientId, message: "", date: formatDate(new Date().toISOString()) }
	});
	const [step, setStep] = useState<Step>("view");

	const onSubmit = async (values: Form) => {
		setIsSubmitting(true);
		const response = await create.mutateAsync(values as CreateObservationRequest);
		setIsSubmitting(false);
		if (!!response) {
			handleResponse(response);
		}
		setStep("view");
		form.reset();
	}

	const onClose = () => {
		form.reset();
		onOpenChange(false);
	}

	const onAdd = () => {
		setStep("add");
	}

	const onView = () => {
		setStep("view");
	}

	const onDelete = async (id: string) => {
		setIsSubmitting(true);
		const response = await deletion.mutateAsync(id);
		setIsSubmitting(false);
		handleResponse(response);
	}

	return { form, isSubmitting, step, onSubmit, onClose, onAdd, onView, onDelete };
}
