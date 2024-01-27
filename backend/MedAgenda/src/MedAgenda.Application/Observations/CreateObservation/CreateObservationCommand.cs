using MedAgenda.Application.Abstractions.Messaging;

namespace MedAgenda.Application.Observations.CreateObservation;

public sealed record CreateObservationCommand(Guid PatientId, string Message, Guid CreatedBy) : ICommand<Guid>;
