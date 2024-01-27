using MedAgenda.Domain.Patients;
using MedAgenda.Domain.Abstractions;
using MedAgenda.Domain.Observations;
using MedAgenda.Application.Abstractions.Clock;
using MedAgenda.Application.Abstractions.Messaging;

namespace MedAgenda.Application.Observations.CreateObservation;

internal class CreateObservationCommandHandler : ICommandHandler<CreateObservationCommand, Guid>
{
	private readonly IUnitOfWork _unitOfWork;
	private readonly IDateTimeProvider _dateTimeProvider;
	private readonly IObservationRepository _observationRepository;

	public CreateObservationCommandHandler(IUnitOfWork unitOfWork, IDateTimeProvider dateTimeProvider, IObservationRepository observationRepository)
	{
		_unitOfWork = unitOfWork;
		_dateTimeProvider = dateTimeProvider;
		_observationRepository = observationRepository;
	}

	public async Task<Result<Guid>> Handle(CreateObservationCommand request, CancellationToken cancellationToken)
	{
		var observation = Observation.Create(new PatientId(request.PatientId), new Message(request.Message), _dateTimeProvider.UtcNow, request.CreatedBy);

		_observationRepository.Add(observation);
		await _unitOfWork.SaveChangesAsync(cancellationToken);

		return observation.Id.Value;
	}
}
