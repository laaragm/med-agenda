using System.Text.Json;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Text.Json.Serialization;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MedAgenda.Application;
using MedAgenda.Infrastructure;

IConfiguration config = null!;
var host = new HostBuilder()
	.ConfigureFunctionsWorkerDefaults()
	.ConfigureAppConfiguration(builder =>
	{
		builder
			.AddJsonFile("local.settings.json", true, true)
			.AddEnvironmentVariables();
		config = builder.Build();
	})
	.ConfigureServices(services =>
	{
		services.AddApplicationInsightsTelemetryWorkerService();
		services.ConfigureFunctionsApplicationInsights();
		services.Configure<JsonSerializerOptions>(options =>
		{
			options.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
			options.Converters.Add(new JsonStringEnumConverter());
			options.WriteIndented = true;
			options.PropertyNameCaseInsensitive = true;
		});
		services.AddApplication();
		services.AddInfrastructure(config);
	})
	.ConfigureLogging(logging =>
	{
		logging.Services.Configure<LoggerFilterOptions>(options =>
		{
			// The Application Insights SDK adds a default logging filter that instructs ILogger to capture only Warning and more severe logs. Application Insights requires an explicit override.
			// Log levels can also be configured using appsettings.json. For more information, see https://learn.microsoft.com/en-us/azure/azure-monitor/app/worker-service#ilogger-logs
			var defaultRule = options.Rules.FirstOrDefault(rule => rule.ProviderName == "Microsoft.Extensions.Logging.ApplicationInsights.ApplicationInsightsLoggerProvider");
			if (defaultRule is not null)
				options.Rules.Remove(defaultRule);
		});
	})
	.Build();

await host.RunAsync();
