using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MedAgenda.Domain.Patients;
using MedAgenda.Domain.Abstractions;
using MedAgenda.Domain.Observations;
using MedAgenda.Infrastructure.Data;
using MedAgenda.Infrastructure.Clock;
using MedAgenda.Infrastructure.Repositories;
using MedAgenda.Application.Abstractions.Data;
using MedAgenda.Application.Abstractions.Clock;

namespace MedAgenda.Infrastructure;

public static class DependencyInjection
{
	public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
	{
		services.AddTransient<IDateTimeProvider, DateTimeProvider>();

		AddPersistence(services, configuration);

		return services;
	}

	private static void AddPersistence(IServiceCollection services, IConfiguration configuration)
	{
		var connectionString = configuration.GetConnectionString("Database") ?? throw new ArgumentNullException(nameof(configuration));

		services.AddDbContext<ApplicationDbContext>(options =>
		{
			options.UseSqlServer(connectionString);
		});

		services.AddScoped<IPatientRepository, PatientRepository>();
		services.AddScoped<IObservationRepository, ObservationRepository>();

		services.AddScoped<IUnitOfWork>(sp => sp.GetRequiredService<ApplicationDbContext>());

		services.AddSingleton<ISqlConnectionFactory>(_ => new SqlConnectionFactory(connectionString));
	}
}
