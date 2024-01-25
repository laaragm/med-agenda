using MedAgenda.Domain.Patients;

namespace MedAgenda.Application.Patients.UpdatePatient;

public interface IPatientUpdateResponseAdapter
{
	UpdatePatientResponse Adapt(Patient patient, string? referenceName);
}

