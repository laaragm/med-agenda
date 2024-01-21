using MedAgenda.Domain.Patients;
using MedAgenda.Application.Abstractions.Messaging;

namespace MedAgenda.Application.Patients.CreatePatient;

public record CreatePatientCommand(
	string Name,
	int MedicalStateCode,
	bool IsTermSigned,
	Guid CreatedBy,
	Guid? ReferencePatientId,
	int? PeriodicityInDays,
	string? PhoneNumber)
	: ICommand<Guid>;
