using MedAgenda.Domain.Observations;

namespace MedAgenda.Application.Observations.UpdateObservation;

public class ObservationUpdateResponseAdapter : IObservationUpdateResponseAdapter
{
	public UpdateObservationResponse Adapt(Observation observation)
	{
		if (observation == null)
			throw new ArgumentNullException(nameof(observation));

		return new UpdateObservationResponse
		{
			Id = observation.Id.Value,
			Message = observation.Message.Value,
			Date = observation.CreatedOn
		};
	}
}