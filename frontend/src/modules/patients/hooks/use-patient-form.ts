import { useRef } from 'react';

type Element = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;

export function usePatientForm<T extends Object>(onOpenChange: (isOpen: boolean) => void, initialData: T) {
	const formRefs = useRef<{ [K in keyof T]?: Element }>({} as { [K in keyof T]?: Element });

	const setRefs = (field: keyof T, element: Element) => {
		formRefs.current[field] = element;
	};

	const onSubmit = (event: React.FormEvent<HTMLFormElement>): T => {
		event.preventDefault();
		const formData: Partial<T> = {};
		Object.keys(formRefs.current).forEach((key) => {
			const field = key as keyof T;
			const ref = formRefs.current[field];
			if (ref instanceof HTMLInputElement) {
				formData[field] = ref.type === "checkbox" ? ref.checked : ref.value as any;
			} else if (ref instanceof HTMLSelectElement || ref instanceof HTMLTextAreaElement) {
				formData[field] = ref.value as any;
			}
		});

		console.log("formData: ", formData);

		return formData as T;
	};

	const onResetForm = () => {
		Object.keys(initialData).forEach((key) => {
			const ref = formRefs.current[key as keyof T];
			if (ref instanceof HTMLInputElement && ref.type === "checkbox") {
			  ref.checked = initialData[key as keyof T] as boolean || false;
			} else if (ref) {
			  ref.value = initialData[key as keyof T] as string || '';
			}
		});
	};

	const onClose = () => {
		onOpenChange(false);
		onResetForm();
	}

	return { formRefs, setRefs, onClose, onSubmit, onResetForm };
}
