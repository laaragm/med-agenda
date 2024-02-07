import { usePatientForm } from "@/patients/hooks";
import { IPatient, MedicalState } from "@/patients/models";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Button,
	Dialog,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	TextInput
} from "@/common/components";
import Illustration from "@/assets/alien-spaceship-illustration.svg";

type CreatePatientDialogProps = {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

export function CreatePatientDialog({ isOpen, onOpenChange }: CreatePatientDialogProps) {
	const { form, onSubmit, onClose } = usePatientForm(onOpenChange);
	const medicalStateKeys = Object.keys(MedicalState).filter((key) => isNaN(Number(key)));

	return (
		<Dialog
			isOpen={isOpen}
			aria-labelledby="Cadastrar novo paciente"
			className="max-w-[95%] sm:max-w-[90%] md:max-w-[60%] p-6 rounded-lg shadow-md"
			onOpenChange={onClose}
		>
			<h2 className="text-xl font-semibold">Cadastrar novo paciente</h2>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6 z-50">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nome</FormLabel>
								<FormControl>
									<TextInput className="py-0 px-2 h-8" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="referencePatientId"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Referência</FormLabel>
								<FormControl>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<SelectTrigger className="py-1 h-8">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="light">Light</SelectItem>
											<SelectItem value="dark">Dark</SelectItem>
											<SelectItem value="system">System</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="periodicityInDays"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Periodicidade</FormLabel>
								<FormControl>
									<TextInput className="py-0 px-2 h-8" value={!!field.value ? +field.value : undefined} onChange={field.onChange} type="number" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="medicalStateCode"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tipo</FormLabel>
								<FormControl>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<SelectTrigger className="py-1 h-8">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											{medicalStateKeys.map((key) => <SelectItem key={key} value={String(MedicalState[key as any])}>{key}</SelectItem>)}
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="isTermSigned"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Assinou termo</FormLabel>
								<FormControl>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<SelectTrigger className="py-1 h-8">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="true">Sim</SelectItem>
											<SelectItem value="false">Não</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="phoneNumber"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Telefone</FormLabel>
								<FormControl>
									<TextInput className="py-0 px-2 h-8" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

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
							<Button type="submit" className="w-fit px-12">Salvar</Button>
						</div>
					</div>
				</form>
			</Form>
		</Dialog>
	);
}
