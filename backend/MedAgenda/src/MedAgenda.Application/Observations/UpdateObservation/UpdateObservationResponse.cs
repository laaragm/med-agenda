namespace MedAgenda.Application.Observations.UpdateObservation;

public sealed class UpdateObservationResponse
{
	public Guid Id { get; init; }
	public string Message { get; init; }
	public DateTime Date { get; init; }
}