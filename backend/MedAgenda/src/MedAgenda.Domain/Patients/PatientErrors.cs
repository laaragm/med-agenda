using MedAgenda.Domain.Abstractions;
using System.Net;

namespace MedAgenda.Domain.Patients;

public static class PatientErrors
{
	public static Error NotFound = new("Property.NotFound", "A propriedade com o id especificado não foi encontrada", HttpStatusCode.BadRequest);
	public static Error Overlap = new("Patient.Overlap", "O paciente atual está sobrepondo um existente", HttpStatusCode.PreconditionFailed);
	public static Error ExistingReferences = new("Patient.ExistingReferences", "O paciente atual possui referências a entidades não resolvidas ou conflitantes", HttpStatusCode.Conflict);
}
