import { useObservationForm, useObservations } from "@/observations/hooks";
import { Button, Dialog, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, TextInput } from "@/common/components";
import Illustration from "@/assets/alien-spaceship-illustration.svg";
import NoContentIllustration from "@/assets/no-content-illustration.svg";

type ObservationsDialogProps = {
	patientId: string;
	patientName: string;
	onOpenChange: (open: boolean) => void;
}

export function ObservationsDialog({ patientId, patientName, onOpenChange }: ObservationsDialogProps) {
	const { data: observations } = useObservations(patientId);
	const { form, isSubmitting, onSubmit, onClose } = useObservationForm(onOpenChange, { patientId, observations: observations?.result });

	return (
		<Dialog
			isOpen={true}
			aria-labelledby="Observações"
			className="max-w-[95%] sm:max-w-[90%] md:max-w-[60%] min-h-[50%] p-6 rounded-lg shadow-md"
			onOpenChange={onClose}
		>
			<h2 className="text-xl font-semibold">Observações</h2>

			<h4 className="font-semibold mt-2">{patientName}</h4>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6 z-50">
					{observations?.result && observations.result.length > 0 ? observations?.result?.map((observation, index) => (
						<>
							<div key={observation.id} className="grid grid-cols-2 gap-2">
								<FormField
									control={form.control}
									name={`observations.${index}.date`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nome</FormLabel>
											<FormControl>
												<TextInput className="py-0 px-2 h-8" value={!!field.value ? field.value : undefined} onChange={field.onChange} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`observations.${index}.message`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nome</FormLabel>
											<FormControl>
												<TextInput className="py-0 px-2 h-8" value={!!field.value ? field.value : undefined} onChange={field.onChange} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="flex items-end justify-end">
								<div className="flex flex-row items-center">
									<img
										src={Illustration}
										alt="Spaceship Illustration"
										width={100}
										height={100}
										className="absolute left-0"
										aria-hidden="true"
									/>
									<Button type="submit" loading={isSubmitting} className="w-fit px-12">Salvar</Button>
								</div>
							</div>
						</>
					)) : (
						<>
							<div className="flex flex-col items-center justify-center gap-4 mt-6">
								<img
									src={NoContentIllustration}
									alt="No Content Illustration"
									width={300}
									height={300}
									aria-hidden="true"
								/>
								<p className="font-semibold">Comece a criar as observações e vejas elas aparecerem aqui!</p>
							</div>
							<div className="flex items-end justify-end mt-5">
								<Button className="w-fit px-12">Adicionar</Button>
							</div>
						</>
					)}
				</form>
			</Form>
		</Dialog>
	);
}
