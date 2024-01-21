using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using MedAgenda.Application.Abstractions.Behaviors;

namespace MedAgenda.Application;

public static class DependencyInjection
{
	public static IServiceCollection AddApplication(this IServiceCollection services)
	{
		services.AddMediatR(configuration =>
		{
			configuration.RegisterServicesFromAssembly(typeof(DependencyInjection).Assembly);
			configuration.AddOpenBehavior(typeof(LoggingBehavior<,>));
			configuration.AddOpenBehavior(typeof(ValidationBehavior<,>));
		});

		// Scan the assembly and register any validators as an IValidator instance
		services.AddValidatorsFromAssembly(typeof(DependencyInjection).Assembly);

		return services;
	}
}