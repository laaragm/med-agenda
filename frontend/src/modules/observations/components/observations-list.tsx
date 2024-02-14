import { Trash } from "phosphor-react";

import { useObservations } from "@/observations/hooks";
import { Button, Label, ScrollArea, Spinner, TextInput } from "@/common/components";
import Illustration from "@/assets/alien-spaceship-illustration.svg";
import NoContentIllustration from "@/assets/no-content-illustration.svg";

type ObservationsListProps = {
	patientId: string;
	deleting: string | undefined;
	onAdd: () => void;
	onDelete: (id: string) => void;
}

export function ObservationsList({ patientId, deleting, onAdd, onDelete }: ObservationsListProps) {
	const { data: observations } = useObservations(patientId);

	return (
		<div className="h-[80%] w-full mt-5">
			{observations?.result?.length === 0 ? (
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
					<div className="flex items-end justify-end mt-8">
						<Button className="w-fit px-12" onClick={onAdd}>Adicionar</Button>
					</div>
				</>
			) : (
				<>
					<ScrollArea showScrollbarOnHover className="space-y-3 max-h-[23rem] lg:max-h-[28.5rem] overflow-y-auto overflow-x-hidden pr-3">
						{observations?.result?.map((observation, index) => (
							<div key={observation.id} className="lg:grid lg:grid-cols-[20%_75%_3%] gap-2 flex flex-col lg:flex-row">
								{index === 0 && (
									<>
										<Label className="hidden lg:flex">Data:</Label>
										<Label className="hidden lg:flex">Observação:</Label>
										<span className="hidden lg:flex"></span>
									</>
								)}
								<div className="flex flex-col gap-1">
									<Label className="lg:hidden flex">Data:</Label>
									<TextInput className="py-0 px-2 h-8 cursor-default" value={observation.date} readOnly />
								</div>
								<div className="flex flex-col gap-1">
									<Label className="lg:hidden flex">Observação:</Label>
									<TextInput className="py-0 px-2 h-8 cursor-default" value={observation.message} readOnly />
								</div>
								<div className="flex items-center justify-end">
									{deleting === observation.id ? (
										<Spinner className="w-[22px] h-[22px] hidden lg:flex" />
									) : (
										<Trash size={22} className="cursor-pointer text-danger hidden lg:flex" onClick={() => onDelete(observation.id)} />
									)}
									<Button size="small" variant="outlined-danger" loading={deleting === observation.id} className="w-fit lg:hidden" onClick={() => onDelete(observation.id)}>
										Excluir
									</Button>
								</div>
							</div>
						))}
					</ScrollArea>

					<div className="flex flex-row items-center justify-end gap-2">
						<img
							src={Illustration}
							alt="Spaceship Illustration"
							width={100}
							height={100}
							aria-hidden="true"
						/>
						<Button className="w-fit px-12" onClick={onAdd}>Adicionar</Button>
					</div>
				</>
			)}
		</div>
	);
}
