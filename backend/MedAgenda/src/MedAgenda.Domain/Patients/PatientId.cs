namespace MedAgenda.Domain.Patients;

public record PatientId(Guid Value)
{
	public static PatientId New() => new(Guid.NewGuid());
}
