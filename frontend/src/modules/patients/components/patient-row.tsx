import { isStringNullOrEmpty } from "@/modules/common/utils";
import { IPatient, ISummarizedPatient, getMedicalStateName } from "@/patients/models";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/common/components/accordion";

type PatientRowProps = {
	patient: ISummarizedPatient | IPatient;
	patientDetails: IPatient | null;
	isLoadingDetails: boolean;
	onExpand: () => void;
}

const Item = ({ label, data }: { label: string, data: string | number | undefined }) => (
	<span className="flex flex-row gap-1 text-base">
		<span className="font-semibold">{label}:</span> {!!data ? data : "Não informado"}
	</span>
);

export function PatientRow({ patient, patientDetails, isLoadingDetails, onExpand }: PatientRowProps) {
	return (
		<Accordion type="single" collapsible>
			<AccordionItem value={patient.id}>
				<AccordionTrigger onClick={onExpand}>
					{patient.name} {isStringNullOrEmpty(patient.reference) ? "" : `(${patient.reference})`}
				</AccordionTrigger>
				<AccordionContent>
					{isLoadingDetails && (
						<span className="flex flex-row items-end gap-1 rounded-lg max-w-[70%]">
							<span className="text-base">Carregando detalhes do paciente</span>
							<span className="bg-textPrimary mb-1 rounded-full w-1 h-1 animate-bounce" />
							<span className="bg-textPrimary mb-1 rounded-full w-1 h-1 animate-bounce animation-delay-200" />
							<span className="bg-textPrimary mb-1 rounded-full w-1 h-1 animate-bounce animation-delay-400" />
						</span>
					)}
					{!!patientDetails && !isLoadingDetails && (
						<div className="grid grid-cols-2 gap-2">
							<Item label="Tipo" data={getMedicalStateName(patientDetails.medicalStateCode)} />
							<Item label="Periodicidade" data={!!patientDetails.periodicityInDays ? `${patientDetails.periodicityInDays} dias` : undefined} />
							<Item label="Referência" data={patientDetails.reference} />
							<Item label="Assinou termo" data={patientDetails.isTermSigned ? "Sim" : "Não"} />
							<Item label="Telefone" data={patientDetails.phoneNumber} />
						</div>
					)}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
