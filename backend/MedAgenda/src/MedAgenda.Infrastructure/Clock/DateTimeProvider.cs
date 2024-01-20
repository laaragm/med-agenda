using MedAgenda.Application.Abstractions.Clock;

namespace MedAgenda.Infrastructure.Clock;

internal sealed class DateTimeProvider : IDateTimeProvider
{
	public DateTime UtcNow => DateTime.UtcNow;
}