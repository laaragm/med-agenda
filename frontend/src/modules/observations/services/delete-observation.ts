import { Delete } from "@/common/services";
import { IServiceResponse } from "@/common/models";

export function DeleteObservation(id: string): Promise<IServiceResponse<boolean>> {
	return Delete<boolean>({
		route: `observations/${id}`,
		defaultErrorMessage: "Não foi possível deletar a observação",
	});
}
