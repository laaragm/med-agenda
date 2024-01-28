using FluentValidation;

namespace MedAgenda.Application.Observations.UpdateObservation;

public class UpdateObservationCommandValidator : AbstractValidator<UpdateObservationCommand>
{
	public UpdateObservationCommandValidator()
	{
		RuleFor(x => x.Id)
			.NotNull()
			.WithMessage("The id must be provided.");

		RuleFor(x => x.Message)
			.NotEmpty()
			.WithMessage("The message can't be empty.");
	}
}