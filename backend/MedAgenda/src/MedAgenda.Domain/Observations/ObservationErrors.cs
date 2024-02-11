using System.Net;
using MedAgenda.Domain.Abstractions;

namespace MedAgenda.Domain.Patients;

public static class ObservationErrors
{
	public static Error NotFound = new("Property.NotFound", "A propriedade com o id especificado não foi encontrada", HttpStatusCode.BadRequest);
}
