import { Dialog } from "@/common/components";
import { useObservationForm } from "@/observations/hooks";
import { ObservationForm, ObservationsList } from "@/observations/components";

type ObservationsDialogProps = {
	patientId: string;
	patientName: string;
	onOpenChange: (open: boolean) => void;
}

export function ObservationsDialog({ patientId, patientName, onOpenChange }: ObservationsDialogProps) {
	const { form, isSubmitting, step, onSubmit, onClose, onAdd, onView, onDelete } = useObservationForm(onOpenChange, patientId);

	return (
		<Dialog
			isOpen={true}
			aria-labelledby="Observações"
			className="max-w-[95%] sm:max-w-[90%] md:max-w-[60%] h-[70%] p-6 rounded-lg shadow-md"
			onOpenChange={onClose}
		>
			<h2 className="text-xl font-semibold">Observações</h2>
			<h4 className="font-semibold mt-2">{patientName}</h4>

			{step === "view" && (
				<ObservationsList patientId={patientId} isSubmitting={isSubmitting} onAdd={onAdd} onDelete={onDelete} />
			)}

			{step === "add" && (
				<ObservationForm form={form} isSubmitting={isSubmitting} onView={onView} onSubmit={onSubmit} />
			)}
		</Dialog>
	);
}
