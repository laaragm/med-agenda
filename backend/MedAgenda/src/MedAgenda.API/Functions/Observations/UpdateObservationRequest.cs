namespace MedAgenda.API.Functions.Observations;

public sealed record UpdateObservationRequest(Guid Id, string Message, Guid UpdatedBy);
