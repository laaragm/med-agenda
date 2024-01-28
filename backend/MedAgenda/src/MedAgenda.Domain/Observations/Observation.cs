using MedAgenda.Domain.Patients;
using MedAgenda.Domain.Abstractions;

namespace MedAgenda.Domain.Observations;

public sealed class Observation : Entity<ObservationId>
{
	public PatientId PatientId { get; private set; }
	public Message Message { get; private set; }
	public DateTime CreatedOn { get; private set; }
	public Guid CreatedBy { get; private set; }
	public DateTime? UpdatedOn { get; private set; }
	public Guid? UpdatedBy { get; private set; }

	private Observation() { }

	public static Observation Create(PatientId patientId, Message message, DateTime utcNow, Guid createdBy)
	{
		return new Observation
		{
			Id = ObservationId.New(),
			PatientId = patientId,
			Message = message,
			CreatedOn = utcNow,
			CreatedBy = createdBy,
		};
	}

	public void Update(Message message, DateTime utcNow, Guid updatedBy)
	{
		Message = message;
		UpdatedOn = utcNow;
		UpdatedBy = updatedBy;
	}
}
