using MedAgenda.Application.Abstractions.Messaging;

namespace MedAgenda.Application.Observations.UpdateObservation;

public sealed record UpdateObservationCommand(Guid Id, string Message, Guid UpdatedBy) : ICommand<UpdateObservationResponse>;
