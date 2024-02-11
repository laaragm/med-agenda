namespace MedAgenda.API.Functions.Patients;

public sealed record UpdatePatientRequest(
	Guid Id,
	string Name,
	int MedicalStateCode,
	bool IsTermSigned,
	Guid UpdatedBy,
	Guid? ReferenceId,
	int? PeriodicityInDays,
	string? PhoneNumber);
