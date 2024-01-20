namespace MedAgenda.Domain.Observations;

public record ObservationId(Guid Value)
{
	public static ObservationId New() => new(Guid.NewGuid());
}
