import { Trash } from "phosphor-react";

import { useObservations } from "@/observations/hooks";
import { Button, Label, ScrollArea, TextInput } from "@/common/components";
import Illustration from "@/assets/alien-spaceship-illustration.svg";
import NoContentIllustration from "@/assets/no-content-illustration.svg";

type ObservationsListProps = {
	patientId: string;
	onAdd: () => void;
	onDelete: (id: string) => void;
}

export function ObservationsList({ patientId, onAdd, onDelete }: ObservationsListProps) {
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
				<ScrollArea showScrollbarOnHover className="space-y-3 max-h-[23rem] lg:max-h-[26.5rem] overflow-y-auto overflow-x-hidden pr-3">
					{observations?.result?.map((observation, index) => (
						<div key={observation.id} className="lg:grid lg:grid-cols-[20%_75%_4%] gap-2 flex flex-col lg:flex-row">
							{index === 0 && (
								<>
									<Label>Data:</Label>
									<Label>Observação:</Label>
									<span></span>
								</>
							)}
							<TextInput className="py-0 px-2 h-8" value={observation.date} readOnly />
							<TextInput className="py-0 px-2 h-8" value={observation.message} readOnly />
							<div className="flex items-center justify-end lg:pt-1">
								<Trash size={22} className="cursor-pointer text-danger hidden lg:flex" onClick={() => onDelete(observation.id)} />
								<Button size="small" variant="outlined-danger" className="w-fit lg:hidden" onClick={() => onDelete(observation.id)}>
									Remover <Trash size={16} />
								</Button>
							</div>
						</div>
					))}
				</ScrollArea>
			)}

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
		</div>
	);
}
