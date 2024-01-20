using MedAgenda.Domain.Patients;

namespace MedAgenda.Infrastructure.Repositories;

internal sealed class PatientRepository : Repository<Patient, PatientId>, IPatientRepository
{
	public PatientRepository(ApplicationDbContext dbContext) : base(dbContext)
	{
	}
}
