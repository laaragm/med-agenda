using FluentValidation;

namespace MedAgenda.Application.Patients.CreatePatient;

public class CreatePatientCommandValidator : AbstractValidator<CreatePatientCommand>
{
	public CreatePatientCommandValidator()
	{
		RuleFor(x => x.Name).NotEmpty();
		RuleFor(x => x.MedicalState).NotEmpty();
		RuleFor(x => x.IsTermSigned).NotEmpty();
	}
}
