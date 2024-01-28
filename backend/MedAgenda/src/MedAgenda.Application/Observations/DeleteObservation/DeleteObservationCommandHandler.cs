using MedAgenda.Domain.Patients;
using MedAgenda.Domain.Abstractions;
using MedAgenda.Domain.Observations;
using MedAgenda.Application.Abstractions.Clock;
using MedAgenda.Application.Abstractions.Messaging;

namespace MedAgenda.Application.Observations.DeleteObservation;

public sealed class DeleteObservationCommandHandler : ICommandHandler<DeleteObservationCommand>
{
	private readonly IUnitOfWork _unitOfWork;
	private readonly IDateTimeProvider _dateTimeProvider;
	private readonly IObservationRepository _observationRepository;

	public DeleteObservationCommandHandler(IUnitOfWork unitOfWork, IDateTimeProvider dateTimeProvider, IObservationRepository observationRepository)
	{
		_unitOfWork = unitOfWork;
		_dateTimeProvider = dateTimeProvider;
		_observationRepository = observationRepository;
	}

	public async Task<Result> Handle(DeleteObservationCommand request, CancellationToken cancellationToken)
	{
		var observation = await _observationRepository.GetByIdAsync(new ObservationId(request.Id));
		if (observation is null)
			return Result.Failure(ObservationErrors.NotFound);

		_observationRepository.Delete(observation);
		await _unitOfWork.SaveChangesAsync(cancellationToken);

		return Result.Success();
	}
}
