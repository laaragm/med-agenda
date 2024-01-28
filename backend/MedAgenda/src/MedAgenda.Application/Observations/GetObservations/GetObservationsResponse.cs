namespace MedAgenda.Application.Observations.GetObservations;

public sealed class GetObservationsResponse
{
	public Guid Id { get; init; }
	public DateTime Date { get; init; }
	public string Message { get; init; }
}
