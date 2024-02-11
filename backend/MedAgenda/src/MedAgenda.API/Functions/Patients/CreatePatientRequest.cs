namespace MedAgenda.API.Functions.Patients;

public sealed record CreatePatientRequest(
	string Name,
	int MedicalStateCode,
	bool IsTermSigned,
	Guid? ReferenceId,
	int? PeriodicityInDays,
	string? PhoneNumber);
