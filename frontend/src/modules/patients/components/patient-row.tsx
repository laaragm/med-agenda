import { IPatient, ISummarizedPatient } from "@/patients/models";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/common/components/accordion";
import { isStringNullOrEmpty } from "@/modules/common/utils";

type PatientRowProps = {
	patient: ISummarizedPatient | IPatient;
}

export function PatientRow({ patient }: PatientRowProps) {
	return (
		<Accordion type="single" collapsible>
			<AccordionItem value={patient.id}>
				<AccordionTrigger>
					{patient.name} {isStringNullOrEmpty(patient.reference) ? "" : `(${patient.reference})`}
				</AccordionTrigger>
				<AccordionContent>
					Fetching patient...
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
