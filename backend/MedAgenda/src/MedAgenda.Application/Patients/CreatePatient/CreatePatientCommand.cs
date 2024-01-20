using MedAgenda.Domain.Patients;
using MedAgenda.Application.Abstractions.Messaging;

namespace MedAgenda.Application.Patients.CreatePatient;

public record CreatePatientCommand(
	string Name,
	MedicalState MedicalState,
	bool IsTermSigned,
	Guid createdBy,
	Guid? ReferencePatientId,
	int? PeriodicityInDays,
	string? PhoneNumber)
	: ICommand<Guid>;
