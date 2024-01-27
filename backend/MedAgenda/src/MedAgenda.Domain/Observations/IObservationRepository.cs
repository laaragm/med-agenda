using MedAgenda.Domain.Patients;

namespace MedAgenda.Domain.Observations;

public interface IObservationRepository
{
	Task<Observation?> GetByIdAsync(ObservationId id, CancellationToken cancellationToken = default);
	void Add(Observation observation);
	void Delete(Observation observation);
	void Update(Observation observation);
}
