using MedAgenda.Domain.Abstractions;

namespace MedAgenda.Domain.Patients;

public static class ObservationErrors
{
	public static Error NotFound = new("Property.NotFound", "The property with the specified id was not found");
}
