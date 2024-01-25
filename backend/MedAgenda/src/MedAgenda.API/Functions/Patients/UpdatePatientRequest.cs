namespace MedAgenda.API.Functions.Patients;

public sealed record UpdatePatientRequest(
	Guid Id,
	string Name,
	int MedicalStateCode,
	bool IsTermSigned,
	Guid UpdatedBy,
	Guid? ReferencePatientId,
	int? PeriodicityInDays,
	string? PhoneNumber);
