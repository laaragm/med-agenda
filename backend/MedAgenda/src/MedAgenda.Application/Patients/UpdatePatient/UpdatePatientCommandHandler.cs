using MedAgenda.Domain.Patients;
using MedAgenda.Domain.Abstractions;
using MedAgenda.Application.Exceptions;
using MedAgenda.Application.Abstractions.Clock;
using MedAgenda.Application.Abstractions.Messaging;

namespace MedAgenda.Application.Patients.UpdatePatient;

public sealed class UpdatePatientCommandHandler : ICommandHandler<UpdatePatientCommand, Patient>
{
	private readonly IUnitOfWork _unitOfWork;
	private readonly IDateTimeProvider _dateTimeProvider;
	private readonly IPatientRepository _patientRepository;

	public UpdatePatientCommandHandler(IUnitOfWork unitOfWork, IDateTimeProvider dateTimeProvider, IPatientRepository patientRepository)
	{
		_unitOfWork = unitOfWork;
		_dateTimeProvider = dateTimeProvider;
		_patientRepository = patientRepository;
	}

	public async Task<Result<Patient>> Handle(UpdatePatientCommand request, CancellationToken cancellationToken)
	{
		try
		{
			var patient = await _patientRepository.GetByIdAsync(new PatientId(request.Id));
			if (patient is null)
				return Result.Failure<Patient>(PatientErrors.NotFound);

			patient.Update(
				new Name(request.Name),
				MedicalState.GetByCode(request.MedicalStateCode),
				new IsTermSigned(request.IsTermSigned),
				_dateTimeProvider.UtcNow,
				request.UpdatedBy,
				request.ReferencePatientId.HasValue ? new PatientId(request.ReferencePatientId.Value) : null,
				request.PeriodicityInDays.HasValue ? new PeriodicityInDays(request.PeriodicityInDays.Value) : null,
				request.PhoneNumber != null ? new PhoneNumber(request.PhoneNumber) : null);

			_patientRepository.Update(patient);
			await _unitOfWork.SaveChangesAsync(cancellationToken);

			return Result.Success(patient);
		}
		catch (ConcurrencyException)
		{
			return Result.Failure<Patient>(PatientErrors.Overlap);
		}
	}
}
