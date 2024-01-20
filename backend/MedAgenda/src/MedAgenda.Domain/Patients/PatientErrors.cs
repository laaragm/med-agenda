using MedAgenda.Domain.Abstractions;

namespace MedAgenda.Domain.Patients;

public static class PatientErrors
{
	public static Error NotFound = new("Property.NotFound", "The property with the specified id was not found");
	public static Error Overlap = new("Patient.Overlap", "The current patient is overlapping with an existing one");
}
