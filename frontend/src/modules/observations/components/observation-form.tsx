import { UseFormReturn } from "react-hook-form";

import { Form as IForm } from "@/observations/hooks";
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, TextInput } from "@/common/components";
import Illustration from "@/assets/alien-spaceship-illustration.svg";

type ObservationFormProps = {
	form: UseFormReturn<IForm>;
	isSubmitting: boolean;
	onView: () => void;
	onSubmit: (values: IForm) => void;
}

export function ObservationForm({ form, isSubmitting, onView, onSubmit }: ObservationFormProps) {
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 z-50">
				<div className="flex flex-col gap-2">
					<FormField
						control={form.control}
						name="message"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Observação:</FormLabel>
								<FormControl>
									<TextInput className="py-0 px-2 h-8" value={field.value} onChange={field.onChange} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex flex-row items-center justify-end gap-2">
					<img
						src={Illustration}
						alt="Spaceship Illustration"
						width={100}
						height={100}
						aria-hidden="true"
					/>
					<Button variant="contained-danger" className="w-fit lg:px-10" onClick={onView}>Cancelar</Button>
					<Button type="submit" loading={isSubmitting} className="w-fit lg:px-12">Salvar</Button>
				</div>
			</form>
		</Form>
	);
}
