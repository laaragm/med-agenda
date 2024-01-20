using MedAgenda.Domain.Patients;
using MedAgenda.Domain.Abstractions;
using MedAgenda.Application.Exceptions;
using MedAgenda.Application.Abstractions.Clock;
using MedAgenda.Application.Abstractions.Messaging;

namespace MedAgenda.Application.Patients.CreatePatient;

public sealed class CreatePatientCommandHandler : ICommandHandler<CreatePatientCommand, Guid>
{
	private readonly IUnitOfWork _unitOfWork;
	private readonly IDateTimeProvider _dateTimeProvider;
	private readonly IPatientRepository _patientRepository;

	public CreatePatientCommandHandler(
		IUnitOfWork unitOfWork,
		IDateTimeProvider dateTimeProvider,
		IPatientRepository patientRepository)
	{
		_unitOfWork = unitOfWork;
		_dateTimeProvider = dateTimeProvider;
		_patientRepository = patientRepository;
	}

	public async Task<Result<Guid>> Handle(CreatePatientCommand request, CancellationToken cancellationToken)
	{
		try
		{
			var patient = Patient.Create(
				new Name(request.Name),
				request.MedicalState,
				new IsTermSigned(request.IsTermSigned),
				_dateTimeProvider.UtcNow,
				request.createdBy,
				request.ReferencePatientId.HasValue ? new PatientId(request.ReferencePatientId.Value) : null,
				request.PeriodicityInDays.HasValue ? new PeriodicityInDays(request.PeriodicityInDays.Value) : null,
				request.PhoneNumber != null ? new PhoneNumber(request.PhoneNumber) : null);

			_patientRepository.Add(patient);
			await _unitOfWork.SaveChangesAsync(cancellationToken);

			return patient.Id.Value;
		}
		catch (ConcurrencyException)
		{
			return Result.Failure<Guid>(PatientErrors.Overlap);
		}
	}
}
