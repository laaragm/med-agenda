using MedAgenda.Domain.Patients;
using MedAgenda.Domain.Abstractions;
using MedAgenda.Domain.Observations;
using MedAgenda.Application.Abstractions.Clock;
using MedAgenda.Application.Abstractions.Messaging;

namespace MedAgenda.Application.Observations.UpdateObservation;

public sealed class UpdateObservationCommandHandler : ICommandHandler<UpdateObservationCommand, UpdateObservationResponse>
{
	private readonly IUnitOfWork _unitOfWork;
	private readonly IDateTimeProvider _dateTimeProvider;
	private readonly IObservationRepository _observationRepository;
	private readonly IObservationUpdateResponseAdapter _observationUpdateResponseAdapter;

	public UpdateObservationCommandHandler(
		IUnitOfWork unitOfWork,
		IDateTimeProvider dateTimeProvider,
		IObservationRepository observationRepository,
		IObservationUpdateResponseAdapter observationUpdateResponseAdapter)
	{
		_unitOfWork = unitOfWork;
		_dateTimeProvider = dateTimeProvider;
		_observationRepository = observationRepository;
		_observationUpdateResponseAdapter = observationUpdateResponseAdapter;
	}

	public async Task<Result<UpdateObservationResponse>> Handle(UpdateObservationCommand request, CancellationToken cancellationToken)
	{
		var observation = await _observationRepository.GetByIdAsync(new ObservationId(request.Id));
		if (observation is null)
			return Result.Failure<UpdateObservationResponse>(ObservationErrors.NotFound);

		observation.Update(new Message(request.Message), _dateTimeProvider.UtcNow, request.UpdatedBy);

		_observationRepository.Update(observation);

		var result = _observationUpdateResponseAdapter.Adapt(observation);

		await _unitOfWork.SaveChangesAsync(cancellationToken);

		return Result.Success(result);
	}
}
