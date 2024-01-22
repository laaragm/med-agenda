using MedAgenda.Application.Abstractions.Messaging;

namespace MedAgenda.Application.Patients.CreatePatient;

public sealed record CreatePatientCommand(
	string Name,
	int MedicalStateCode,
	bool IsTermSigned,
	Guid CreatedBy,
	Guid? ReferencePatientId,
	int? PeriodicityInDays,
	string? PhoneNumber)
	: ICommand<Guid>;
