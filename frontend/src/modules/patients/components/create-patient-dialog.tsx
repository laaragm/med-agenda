import { IPatient, MedicalState } from "@/patients/models";
import { usePatientForm } from "@/patients/hooks";
import { Button, Dialog, TextInput } from "@/common/components";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components";

type CreatePatientDialogProps = {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

const ItemWrapper = ({ children, text, htmlFor }: { children: React.ReactNode; text: string; htmlFor: string }) => (
	<div className="flex flex-row w-full gap-2">
		<label className="text-base font-medium" htmlFor={htmlFor}>{text}:</label>
		{children}
	</div>
);

export function CreatePatientDialog({ isOpen, onOpenChange }: CreatePatientDialogProps) {
	const initialData = {
		name: "",
		medicalStateCode: 1,
		isTermSigned: false,
		reference: "",
		periodicityInDays: undefined,
		phoneNumber: undefined,
	} as Partial<IPatient>;
	const { formRefs, setRefs, onSubmit, onClose } = usePatientForm(onOpenChange, initialData);
	const medicalStateKeys = Object.keys(MedicalState).filter((key) => isNaN(Number(key)));

	return (
		<Dialog
			isOpen={isOpen}
			aria-labelledby="Cadastrar novo paciente"
			className="max-w-[95%] sm:max-w-[90%] md:max-w-[60%] p-6 rounded-lg shadow-md"
			onOpenChange={onClose}
		>
			<h2 className="text-xl font-semibold">Cadastrar novo paciente</h2>

			<form className="space-y-6 mt-6" onSubmit={onSubmit}>
				<ItemWrapper text="Name" htmlFor="name">
					<TextInput id="name" ref={el => setRefs("name", el)} className="py-0 px-2" />
				</ItemWrapper>

				<ItemWrapper text="Referência" htmlFor="reference">
					<Select id="reference" ref={(el: any) => setRefs("reference", el)}>
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

				<ItemWrapper text="Periodicidade" htmlFor="periodicityInDays">
					<TextInput id="periodicityInDays" ref={el => setRefs("periodicityInDays", el)} type="number" className="py-0 px-2" />
				</ItemWrapper>

				<ItemWrapper text="Tipo" htmlFor="medicalStateCode">
					<Select id="medicalStateCode" ref={(el: any) => setRefs("medicalStateCode", el)}>
						<SelectTrigger className="py-0">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{medicalStateKeys.map((key) => <SelectItem key={key} value={MedicalState[key as any]}>{key}</SelectItem>)}
						</SelectContent>
					</Select>
				</ItemWrapper>

				<ItemWrapper text="Assinou termo" htmlFor="isTermSigned">
					<Select id="isTermSigned" ref={(el: any) => setRefs("isTermSigned", el)}>
						<SelectTrigger className="py-0">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value={true}>Sim</SelectItem>
							<SelectItem value={false}>Não</SelectItem>
						</SelectContent>
					</Select>
				</ItemWrapper>

				<ItemWrapper text="Telefone" htmlFor="phoneNumber">
					<TextInput id="phoneNumber" ref={el => setRefs("phoneNumber", el)} className="py-0 px-2" />
				</ItemWrapper>

				<div className="flex items-end justify-end">
					<Button type="submit" className="w-fit px-12">Salvar</Button>
				</div>
			</form>
		</Dialog>
	);
}
