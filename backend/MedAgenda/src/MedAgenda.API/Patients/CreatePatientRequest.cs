
namespace MedAgenda.API.Patients;

public sealed record CreatePatientRequest(
	string Name,
	int MedicalStateCode,
	bool IsTermSigned,
	Guid? ReferencePatientId,
	int? PeriodicityInDays,
	string? PhoneNumber);
