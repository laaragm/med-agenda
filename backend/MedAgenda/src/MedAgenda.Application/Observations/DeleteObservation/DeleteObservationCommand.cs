using MedAgenda.Application.Abstractions.Messaging;

namespace MedAgenda.Application.Observations.DeleteObservation;

public sealed record DeleteObservationCommand(Guid Id) : ICommand;
