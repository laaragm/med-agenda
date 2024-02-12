export type CreateObservationRequest = {
	patientId: string;
	date: string;
  	message: string;
}

export type UpdateObservationRequest = CreateObservationRequest;
