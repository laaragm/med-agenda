using System.Net;

namespace MedAgenda.Domain.Abstractions;

public record Error(string Code, string Name, HttpStatusCode? StatusCode)
{
	public static Error None = new(string.Empty, string.Empty, null);
	public static Error NullValue = new("Error.NullValue", "Null value was provided", HttpStatusCode.BadRequest);
}
