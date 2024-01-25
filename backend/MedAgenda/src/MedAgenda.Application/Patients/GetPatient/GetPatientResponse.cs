namespace MedAgenda.Application.Patients.GetPatient;

public sealed class GetPatientResponse
{
	public Guid Id { get; init; }
	public string Name { get; init; }
	public int MedicalStateCode { get; init; }
	public bool IsTermSigned { get; init; }
	public int? PeriodicityInDays { get; init; }
	public string? PhoneNumber { get; init; }
	public string Reference { get; init; }
}
