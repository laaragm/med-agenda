import { MedicalState } from "@/patients/models";
import { usePatientForm } from "@/patients/hooks";
import { Button, Dialog, TextInput } from "@/common/components";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components";

type CreatePatientDialogProps = {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

const ItemWrapper = ({ children }: { children: React.ReactNode }) => (
	<div className="flex flex-row gap-2">{children}</div>
);

const Label = ({ text, htmlFor }: { text: string; htmlFor: string }) => (
	<label className="text-base font-medium" htmlFor={htmlFor}>{text}:</label>
);

export function CreatePatientDialog({ isOpen, onOpenChange }: CreatePatientDialogProps) {
	const { data, onChange, onResetForm } = usePatientForm();
	const medicalStateKeys = Object.keys(MedicalState).filter((key) => isNaN(Number(key)));

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		console.log("submit form")
	}

	const handleClose = () => {
		onResetForm();
		onOpenChange(false);
	}

	return (
		<Dialog
			isOpen={isOpen}
			aria-labelledby="Cadastrar novo paciente"
			className="max-w-[95%] sm:max-w-[90%] md:max-w-[60%] p-6 rounded-lg shadow-md"
			onOpenChange={handleClose}
		>
			<h2 className="text-xl font-semibold">Cadastrar novo paciente</h2>

			<form className="space-y-6 mt-6" onSubmit={handleSubmit}>
				<ItemWrapper>
					<Label text="Name" htmlFor="name" />
					<TextInput id="name" value={data.name} className="py-0 px-2" onChange={(e) => onChange(e.target, "name")} />
				</ItemWrapper>

				<ItemWrapper>
					<Label text="Referência" htmlFor="reference" />
					<Select id="reference">
						<SelectTrigger className="py-0">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="light">Light</SelectItem>
							<SelectItem value="dark">Dark</SelectItem>
							<SelectItem value="system">System</SelectItem>
						</SelectContent>
					</Select>
				</ItemWrapper>

				<ItemWrapper>
					<Label text="Periodicidade" htmlFor="periodicityInDays" />
					<TextInput id="periodicityInDays" type="number" value={data.name} className="py-0 px-2" onChange={(e) => onChange(e.target, "periodicityInDays")} />
				</ItemWrapper>

				<ItemWrapper>
					<Label text="Tipo" htmlFor="medicalStateCode" />
					<Select id="medicalStateCode">
						<SelectTrigger className="py-0">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{medicalStateKeys.map((key) => <SelectItem key={key} value={MedicalState[key as any]}>{key}</SelectItem>)}
						</SelectContent>
					</Select>
				</ItemWrapper>

				<ItemWrapper>
					<Label text="Assinou termo" htmlFor="isTermSigned" />
					<Select id="isTermSigned">
						<SelectTrigger className="py-0">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value={true}>Sim</SelectItem>
							<SelectItem value={false}>Não</SelectItem>
						</SelectContent>
					</Select>
				</ItemWrapper>

				<ItemWrapper>
					<Label text="Telefone" htmlFor="phoneNumber" />
					<TextInput id="phoneNumber" value={data.phoneNumber} className="py-0 px-2" onChange={(e) => onChange(e.target, "phoneNumber")} />
				</ItemWrapper>

				<div className="inline-flex items-end">
					<Button type="submit">Salvar</Button>
				</div>
			</form>
		</Dialog>
	);
}
