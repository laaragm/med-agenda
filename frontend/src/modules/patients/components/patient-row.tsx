import { isStringNullOrEmpty } from "@/common/utils";
import { IPatient, ISummarizedPatient } from "@/patients/models";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/common/components";
import { PatientDetails } from "@/patients/components";

type PatientRowProps = {
	patient: ISummarizedPatient | IPatient;
	patientDetails: IPatient | null;
	isLoadingDetails: boolean;
	onExpand: () => void;
}

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
						<PatientDetails patient={patientDetails} />
					)}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
