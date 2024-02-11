import { isStringNullOrEmpty } from "@/common/utils";
import { PatientDetails } from "@/patients/components";
import { IPatient, ISummarizedPatient } from "@/patients/models";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Badge } from "@/common/components";

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
					<span className="flex flex-row gap-2">
						{patient.name} {isStringNullOrEmpty(patient.referenceName) ? "" : `(${patient.referenceName})`}
						{!patient.isTermSigned && <Badge text="Não assinou termo" variant="danger" />}
					</span>
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
