import { Button, Dialog } from "@/common/components";

type CreatePatientDialogProps = {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

export function CreatePatientDialog({ isOpen, onOpenChange }: CreatePatientDialogProps) {
	return (
		<Dialog isOpen={isOpen} aria-labelledby="Cadastrar novo paciente" onOpenChange={onOpenChange}>
			test
		</Dialog>
	);
}
