namespace MedAgenda.Application.Patients.SearchPatient;

public sealed class SearchPatientResponse
{
	public Guid Id { get; init; }
	public string Name { get; init; }
	public string Reference { get; init; }
	public bool IsTermSigned { get; init; }
}
