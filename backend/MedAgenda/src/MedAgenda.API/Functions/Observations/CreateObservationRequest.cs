namespace MedAgenda.API.Functions.Observations;

public sealed record CreateObservationRequest(Guid PatientId, string Message);