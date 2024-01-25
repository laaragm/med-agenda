using MedAgenda.Domain.Abstractions;

namespace MedAgenda.Domain.Patients;

public sealed class Patient : Entity<PatientId>
{
	public Name Name { get; private set; }
	public PhoneNumber? PhoneNumber { get; private set; }
	public MedicalState MedicalState { get; private set; }
	public PatientId? ReferencePatientId { get; private set; }
	public IsTermSigned IsTermSigned { get; private set; }
	public PeriodicityInDays? PeriodicityInDays { get; private set; }
	public DateTime CreatedOn { get; private set; }
	public Guid CreatedBy { get; private set; }
	public DateTime? UpdatedOn { get; private set; }
	public Guid? UpdatedBy { get; private set; }

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
		var patient = new Patient
		{
			Id = PatientId.New(),
			Name = name,
			PhoneNumber = phoneNumber,
			MedicalState = medicalState,
			ReferencePatientId = referencePatientId,
			IsTermSigned = isTermSigned,
			PeriodicityInDays = periodicityInDays,
			CreatedOn = utcNow,
			CreatedBy = createdBy,
		};

		return patient;
	}

	public void Update(
		Name name,
		MedicalState medicalState,
		IsTermSigned isTermSigned,
		DateTime utcNow,
		Guid updatedBy,
		PatientId? referencePatientId,
		PeriodicityInDays? periodicityInDays,
		PhoneNumber? phoneNumber)
	{
		Name = name;
		MedicalState = medicalState;
		IsTermSigned = isTermSigned;
		UpdatedOn = utcNow;
		UpdatedBy = updatedBy;
		ReferencePatientId = referencePatientId;
		PeriodicityInDays = periodicityInDays;
		PhoneNumber = phoneNumber;
	}
}
