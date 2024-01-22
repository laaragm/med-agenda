using MedAgenda.Domain.Patients;
using MedAgenda.Domain.Abstractions;
using MedAgenda.Application.Abstractions.Clock;
using MedAgenda.Application.Abstractions.Messaging;

namespace MedAgenda.Application.Patients.DeletePatient;

public sealed class DeletePatientCommandHandler : ICommandHandler<DeletePatientCommand>
{
	private readonly IUnitOfWork _unitOfWork;
	private readonly IDateTimeProvider _dateTimeProvider;
	private readonly IPatientRepository _patientRepository;

	public DeletePatientCommandHandler(IUnitOfWork unitOfWork, IDateTimeProvider dateTimeProvider, IPatientRepository patientRepository)
	{
		_unitOfWork = unitOfWork;
		_dateTimeProvider = dateTimeProvider;
		_patientRepository = patientRepository;
	}

	public async Task<Result> Handle(DeletePatientCommand request, CancellationToken cancellationToken)
	{
		var patient = await _patientRepository.GetByIdAsync(new PatientId(request.Id));
		if (patient is null)
			return Result.Failure(PatientErrors.NotFound);

		_patientRepository.Delete(patient);
		await _unitOfWork.SaveChangesAsync(cancellationToken);

		return Result.Success();
	}
}
