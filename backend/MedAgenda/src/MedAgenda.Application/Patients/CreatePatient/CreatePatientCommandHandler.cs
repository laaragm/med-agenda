using MedAgenda.Application.Abstractions.Messaging;
using MedAgenda.Domain.Abstractions;

namespace MedAgenda.Application.Patients.CreatePatient;

public sealed class CreatePatientCommandHandler : ICommandHandler<CreatePatientCommand, Guid>
{
	public Task<Result<Guid>> Handle(CreatePatientCommand request, CancellationToken cancellationToken)
	{
		throw new NotImplementedException();
	}
}
