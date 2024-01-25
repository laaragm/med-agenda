using MedAgenda.Domain.Patients;

namespace MedAgenda.Application.Patients.UpdatePatient;

public class PatientUpdateResponseAdapter : IPatientUpdateResponseAdapter
{
	public UpdatePatientResponse Adapt(Patient patient, string? referenceName)
	{
		if (patient == null) 
			throw new ArgumentNullException(nameof(patient));

		return new UpdatePatientResponse
		{
			Id = patient.Id.Value,
			Name = patient.Name.Value,
			MedicalStateCode = patient.MedicalState.Code,
			IsTermSigned = patient.IsTermSigned.Value,
			PeriodicityInDays = patient.PeriodicityInDays?.Value,
			PhoneNumber = patient.PhoneNumber?.Value,
			Reference = referenceName
		};
	}
}
