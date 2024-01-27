using FluentValidation;

namespace MedAgenda.Application.Observations.CreateObservation;

public class CreateObservationCommandValidator : AbstractValidator<CreateObservationCommand>
{
	public CreateObservationCommandValidator()
	{
		RuleFor(x => x.Message)
			.NotEmpty()
			.WithMessage("The message can't be empty.");

		RuleFor(x => x.PatientId)
			.NotNull()
			.WithMessage("The patient must be specified.");
	}
}
