import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
	name: z.string().min(3, { message: "O nome precisa de ter pelo menos 3 caracteres." }),
	medicalStateCode: z.string(),
	isTermSigned: z.string(),
	referencePatientId: z.string().optional(),
	periodicityInDays: z.string().optional(),
	phoneNumber: z.string().optional(),
});

export function usePatientForm<T extends Object>(onOpenChange: (isOpen: boolean) => void, initialData: T) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: !!initialData
			? initialData
			: {
				name: "",
				medicalStateCode: "1",
				isTermSigned: "false",
				referencePatientId: undefined,
				periodicityInDays: undefined,
				phoneNumber: undefined,
			},
	})

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log("submitting form: ", values);
	}

	const onClose = () => {
		form.reset();
		onOpenChange(false);
	}

	return { form, onSubmit, onClose };
}
