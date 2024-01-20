namespace MedAgenda.Application.Abstractions.Clock;

public interface IDateTimeProvider
{
	DateTime UtcNow { get; }
}
