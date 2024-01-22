namespace MedAgenda.Domain.Patients;

public interface IPatientRepository
{
	Task<Patient?> GetByIdAsync(PatientId id, CancellationToken cancellationToken = default);
	void Add(Patient patient);
	void Delete(Patient entity);
}
