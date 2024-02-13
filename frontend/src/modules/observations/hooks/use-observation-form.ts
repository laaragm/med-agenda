import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { handleResponse } from "@/common/utils";
import { useCreateObservation, useUpdateObservation } from "@/observations/hooks";
import { CreateObservationRequest, UpdateObservationRequest } from "@/observations/models";

const formSchema = z.object({
	patientId: z.string(),
	observations: z.array(z.object({
		id: z.string().optional().nullable(),
		date: z.string(),
		message: z.string(),
	})).optional().nullable(),
});

type Form = z.infer<typeof formSchema>;

export function useObservationForm(onOpenChange: (isOpen: boolean) => void, initialData: Form) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { mutation: create } = useCreateObservation();
	const { mutation: update } = useUpdateObservation();
	const form = useForm<Form>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData
	});
	const [rowCount, setRowCount] = useState(initialData.observations?.length || 0);

	const onSubmit = async (values: Form) => {
		setIsSubmitting(true);
		const isUpdateOperation = !!initialData;
		let response;
		if (isUpdateOperation) {
			response = await update.mutateAsync({ patientId: values.patientId, body: values as UpdateObservationRequest });
		} else {
			response = await create.mutateAsync(values as CreateObservationRequest);
		}
		if (!response?.error) {
            onClose();
        }
		setIsSubmitting(false);
		if (!!response) {
			handleResponse<any>(response);
		}
	}

	const onClose = () => {
		form.reset();
		onOpenChange(false);
	}

	const onAddRow = () => {
		setRowCount((prevState) => prevState + 1);
	}

	const onRemoveRow = (index: number) => {
		setRowCount((prevState) => prevState - 1);
		form.getValues().observations?.splice(index, 1);
	}

	return { form, isSubmitting, rowCount, onSubmit, onClose, onAddRow, onRemoveRow };
}
