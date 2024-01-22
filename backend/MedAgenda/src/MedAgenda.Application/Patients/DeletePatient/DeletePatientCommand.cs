using MedAgenda.Application.Abstractions.Messaging;

namespace MedAgenda.Application.Patients.DeletePatient;

public sealed record DeletePatientCommand(Guid Id) : ICommand;
