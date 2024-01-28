using MedAgenda.Domain.Observations;

namespace MedAgenda.Application.Observations.UpdateObservation;

public interface IObservationUpdateResponseAdapter
{
	UpdateObservationResponse Adapt(Observation observation);
}