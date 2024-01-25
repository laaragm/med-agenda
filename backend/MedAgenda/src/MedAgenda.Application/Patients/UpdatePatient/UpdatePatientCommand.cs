using MedAgenda.Application.Abstractions.Messaging;

namespace MedAgenda.Application.Patients.UpdatePatient;

public sealed record UpdatePatientCommand(
	Guid Id,
	string Name,
	int MedicalStateCode,
	bool IsTermSigned,
	Guid UpdatedBy,
	Guid? ReferencePatientId,
	int? PeriodicityInDays,
	string? PhoneNumber)
	: ICommand<UpdatePatientResponse>;
