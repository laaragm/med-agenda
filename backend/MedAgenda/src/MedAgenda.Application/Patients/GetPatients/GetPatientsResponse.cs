namespace MedAgenda.Application.Patients.GetPatients;

// For the query responses we want to use primitive types as much as possible and we want a very flat structure
public sealed class GetPatientsResponse
{
	public Guid Id { get; init; }
	public string Name { get; init; }
	public string Reference { get; init; }
	public bool IsTermSigned { get; init; }
}
