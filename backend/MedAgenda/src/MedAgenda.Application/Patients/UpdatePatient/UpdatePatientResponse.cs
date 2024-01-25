namespace MedAgenda.Application.Patients.UpdatePatient;

public sealed class UpdatePatientResponse
{
	public Guid Id { get; init; }
	public string Name { get; init; }
	public int MedicalStateCode { get; init; }
	public bool IsTermSigned { get; init; }
	public int? PeriodicityInDays { get; init; }
	public string? PhoneNumber { get; init; }
	public string? Reference { get; init; }
}