import { Delete } from "@/common/services";
import { IServiceResponse } from "@/common/models";

export async function DeletePatient(id: string): Promise<IServiceResponse<boolean>> {
    const result = await Delete<boolean>({
		route: `patients/${id}`,
		defaultErrorMessage: "Não foi possível deletar o paciente",
	});

	return result;
}
