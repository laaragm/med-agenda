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
			<h2 className="text-xl font-semibold">Observações</h2>

			<h4 className="font-semibold mt-2">{patientName}</h4>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 z-50">
					<ScrollArea showScrollbarOnHover className="space-y-3 max-h-[23rem] lg:max-h-[26.5rem] overflow-y-auto pr-3">
					{items.map((_, index) => (
						<div key={index} className="lg:grid lg:grid-cols-[20%_75%_3%] gap-2 flex flex-col lg:flex-row">
							{index === 0 && (
								<>
									<FormLabel className="hidden lg:flex">Data:</FormLabel>
									<FormLabel className="hidden lg:flex">Observação:</FormLabel>
									<span className="hidden lg:flex"></span>
								</>
							)}

							<FormField
								control={form.control}
								name={`observations.${index}.date`}
								render={({ field }) => (
									<FormItem>
										<FormLabel className="lg:hidden flex">Data:</FormLabel>
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
										<FormLabel className="lg:hidden flex">Observação:</FormLabel>
										<FormControl>
											<TextInput placeholder="Descrição do evento" className="py-0 px-2 h-8" value={!!field.value ? field.value : undefined} onChange={field.onChange} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="flex items-center justify-end">
								<Trash size={22} className="cursor-pointer text-danger hidden lg:flex" onClick={() => onRemoveRow(index)} />
								<Button size="small" variant="outlined-danger" className="w-fit lg:hidden" onClick={() => onRemoveRow(index)}>
									Remover <Trash size={16} />
								</Button>
							</div>
						</div>
					))}
					</ScrollArea>

					{items.length > 0 && (
						<div>
							<div className="flex items-end justify-end mt-5 lg:mt-3">
								<Button size="small" variant="text" className="w-fit underline" onClick={onAddRow}>Adicionar+</Button>
							</div>
							<div className="pt-8">
									<img
										src={Illustration}
										alt="Spaceship Illustration"
										width={100}
										height={100}
										className="fixed bottom-3 left-0 invisible lg:visible"
										aria-hidden="true"
									/>
									<Button type="submit" loading={isSubmitting} className="fixed bottom-3 right-5 w-fit px-12">Salvar</Button>

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
		</Dialog>
	);
}
