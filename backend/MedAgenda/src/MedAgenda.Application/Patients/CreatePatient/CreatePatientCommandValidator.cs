using FluentValidation;
using MedAgenda.Domain.Patients;

namespace MedAgenda.Application.Patients.CreatePatient;

public class CreatePatientCommandValidator : AbstractValidator<CreatePatientCommand>
{
	public CreatePatientCommandValidator()
	{
		RuleFor(x => x.Name)
			.NotEmpty()
			.WithMessage("The name can't be empty.");

		RuleFor(x => x.MedicalStateCode)
			.NotEmpty()
			.Must(BeAValidStateCode)
			.WithMessage("Invalid Medical State Code.");

		RuleFor(x => x.IsTermSigned)
			.NotNull()
			.WithMessage("The status of the term must be specified.");
	}

	private bool BeAValidStateCode(int code)
	{
		try
		{
			var state = MedicalState.GetByCode(code);
			return state != null; // Valid if we can retrieve a MedicalState
		}
		catch (ApplicationException)
		{
			return false; // Invalid code
		}
	}
}
