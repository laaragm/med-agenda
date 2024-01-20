using MedAgenda.Domain.Patients;
using MedAgenda.Domain.Abstractions;

namespace MedAgenda.Domain.Observations;

public sealed class Observation: Entity<ObservationId>
{
	public PatientId PatientId { get; private set; }
	public Message Message { get; private set; }
	public DateTime CreatedOn { get; private set; }
	public Guid CreatedBy { get; private set; }
	public DateTime? UpdatedOn { get; private set; }
	public Guid? UpdatedBy { get; private set; }

	public Observation(
		ObservationId id,
		PatientId patientId, 
		Message message, 
		DateTime createdOn, 
		Guid createdBy)
		: base(id)
	{
		PatientId = patientId;
		Message = message;
		CreatedOn = createdOn;
		CreatedBy = createdBy;
	}

	private Observation() { }
}
