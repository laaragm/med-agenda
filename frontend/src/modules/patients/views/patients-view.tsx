import { useState } from "react";

import { useStore } from "@/store";
import { Button, Page, RoleGuardedWrapper } from "@/common/components";
import { usePatientDetails, usePatientSearch } from "@/patients/hooks";
import { PatientFormDialog, PatientList, PatientListSkeletonLoading, PatientSearch } from "@/patients/components";
import Illustration from "@/assets/main-illustration.svg";
import { UserType } from "@/modules/common/models";

export function PatientsView() {
	const { onSearch, onClear } = usePatientSearch();
	const { onRequestDetails } = usePatientDetails();
	const { patients, isLoading, currentPatient, isLoadingCurrentPatient } = useStore();
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	return (
		<Page className="px-5 mt-10 gap-6">
			<RoleGuardedWrapper requiredRoles={[UserType.Admin]} fallbackMessage="Você não tem permissões para acessar os dados dos pacientes">
				<div className="flex flex-row w-full items-start justify-between gap-5">
					<div className="w-[70%]">
						<PatientSearch onSearch={onSearch} onClear={onClear} />
					</div>
					<div className="ml-auto">
						<Button className="md:px-12" onClick={() => setIsDialogOpen(true)}>Adicionar</Button>
					</div>
				</div>

				<div className="flex flex-row w-full h-full gap-6">
					<div className="w-full md:w-[70%]">
						{isLoading ? (
							<PatientListSkeletonLoading />
						) : (
							<PatientList patients={patients} selectedPatient={currentPatient} isLoadingCurrentPatient={isLoadingCurrentPatient} onRequestDetails={onRequestDetails} />
						)}
					</div>
					<img
						src={Illustration}
						alt="Illustration"
						className="invisible md:visible aspect-w-1 aspect-h-1 md:aspect-w-4 md:aspect-h-3 animate-bounce-in-right fixed bottom-0 right-0 max-w-full h-auto"
					/>
				</div>

				{isDialogOpen && <PatientFormDialog onOpenChange={setIsDialogOpen} />}
			</RoleGuardedWrapper>
		</Page>
	);
}
