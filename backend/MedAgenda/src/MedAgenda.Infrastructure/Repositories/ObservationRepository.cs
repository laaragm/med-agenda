using MedAgenda.Domain.Observations;

namespace MedAgenda.Infrastructure.Repositories;

internal sealed class ObservationRepository : Repository<Observation, ObservationId>, IObservationRepository
{
	public ObservationRepository(ApplicationDbContext dbContext) : base(dbContext)
	{
	}
}
