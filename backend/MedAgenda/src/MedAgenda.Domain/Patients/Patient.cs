using MedAgenda.Domain.Abstractions;
using MedAgenda.Domain.Observations;

namespace MedAgenda.Domain.Patients;

public sealed class Patient : Entity<PatientId>
{
	public Name Name { get; private set; }
	public PhoneNumber? PhoneNumber { get; private set; }
	public MedicalState MedicalState { get; private set; }
	public PatientId? ReferencePatientId { get; private set; }
	public List<Observation> Observations { get; private set; } = new();
	public DateTime CreatedOn { get; private set; }
	public Guid CreatedBy { get; private set; }
	public DateTime? UpdatedOn { get; private set; }
	public Guid? UpdatedBy { get; private set; }
	public IsTermSigned IsTermSigned { get; private set; }
	public PeriodicityInDays? PeriodicityInDays { get; private set; }

	private Patient(
		PatientId id,
		Name name, 
		PhoneNumber? phoneNumber, 
		MedicalState medicalState, 
		PatientId? referencePatientId, 
		IsTermSigned isTermSigned,
		PeriodicityInDays? periodicityInDays,
		DateTime createdOn, 
		Guid createdBy)
		: base(id)
	{
		Name = name;
		PhoneNumber = phoneNumber;
		MedicalState = medicalState;
		ReferencePatientId = referencePatientId;
		IsTermSigned = isTermSigned;
		PeriodicityInDays = periodicityInDays;
		CreatedOn = createdOn;
		CreatedBy = createdBy;
	}

	private Patient() { }

	public static Patient Create(
		Name name, 
		MedicalState medicalState,
		IsTermSigned isTermSigned,
		DateTime utcNow,
		Guid createdBy,
		PatientId? referencePatientId,
		PeriodicityInDays? periodicityInDays,
		PhoneNumber? phoneNumber)
	{
		var patient = new Patient(
			PatientId.New(),
			name,
			phoneNumber,
			medicalState,
			referencePatientId,
			isTermSigned,
			periodicityInDays,
			utcNow,
			createdBy);
		patient.UpdatedOn = utcNow;
		patient.UpdatedBy = createdBy;

		return patient;
	}

}
