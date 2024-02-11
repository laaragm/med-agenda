using System.Linq.Expressions;

namespace MedAgenda.Domain.Patients;

public interface IPatientRepository
{
	Task<IEnumerable<Patient>> GetAsync(Expression<Func<Patient, bool>> filter, CancellationToken cancellationToken = default);
	Task<Patient?> GetByIdAsync(PatientId id, CancellationToken cancellationToken = default);
	void Add(Patient patient);
	void Delete(Patient entity);
	void Update(Patient entity);
}
