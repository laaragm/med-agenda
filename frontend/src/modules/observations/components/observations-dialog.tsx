import { Scroll, Trash } from "phosphor-react";

import { useObservationForm, useObservations } from "@/observations/hooks";
import { Button, Dialog, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, ScrollArea, TextInput } from "@/common/components";
import Illustration from "@/assets/alien-spaceship-illustration.svg";
import NoContentIllustration from "@/assets/no-content-illustration.svg";

type ObservationsDialogProps = {
	patientId: string;
	patientName: string;
	onOpenChange: (open: boolean) => void;
}

export function ObservationsDialog({ patientId, patientName, onOpenChange }: ObservationsDialogProps) {
	const { data: observations } = useObservations(patientId);
	const { form, isSubmitting, rowCount, onSubmit, onClose, onAddRow, onRemoveRow } = useObservationForm(onOpenChange, { patientId, observations: observations?.result });
	const items = Array.from({ length: rowCount });

	return (
		<Dialog
			isOpen={true}
			aria-labelledby="Observações"
			className="max-w-[95%] sm:max-w-[90%] md:max-w-[60%] h-[70%] p-6 rounded-lg shadow-md"
			onOpenChange={onClose}
		>
			<ScrollArea className="h-full">
				<h2 className="text-xl font-semibold">Observações</h2>

				<h4 className="font-semibold mt-2">{patientName}</h4>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6 z-50">
						{items.map((_, index) => (
							<div key={index} className="grid grid-cols-[20%_75%_3%] gap-2">
								{index === 0 && (
									<>
										<FormLabel>Data:</FormLabel>
										<FormLabel>Observação:</FormLabel>
										<span></span>
									</>
								)}

								<FormField
									control={form.control}
									name={`observations.${index}.date`}
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<TextInput placeholder="dd/mm/yyyy" className="py-0 px-2 h-8" value={!!field.value ? field.value : undefined} onChange={field.onChange} />
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
											<FormControl>
												<TextInput className="py-0 px-2 h-8" value={!!field.value ? field.value : undefined} onChange={field.onChange} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<div className="flex items-center justify-end">
									<Trash size={22} className="cursor-pointer text-danger" onClick={() => onRemoveRow(index)} />
								</div>
							</div>
						))}

						{items.length > 0 && (
							<div>
								<div className="flex items-end justify-end">
									<Button size="small" variant="text" className="w-fit underline" onClick={onAddRow}>Adicionar+</Button>
								</div>
								<div className="flex items-end justify-end pt-8">
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
							</div>
						)}

						{items.length === 0 && (
							<>
								<div className="flex flex-col items-center justify-center gap-4 mt-6">
									<img
										src={NoContentIllustration}
										alt="No Content Illustration"
										width={450}
										height={450}
										aria-hidden="true"
									/>
									<p className="font-semibold">Comece a criar as observações e vejas elas aparecerem aqui!</p>
								</div>
								<div className="flex items-end justify-end mt-5">
									<Button className="w-fit px-12" onClick={onAddRow}>Adicionar</Button>
								</div>
							</>
						)}
					</form>
				</Form>
			</ScrollArea>
		</Dialog>
	);
}
