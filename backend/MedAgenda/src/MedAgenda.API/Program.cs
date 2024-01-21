using System.Text.Json;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Text.Json.Serialization;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Azure.Functions.Worker.Extensions.OpenApi.Extensions;
using MedAgenda.Application;
using MedAgenda.Infrastructure;

IConfiguration config = null!;
var host = new HostBuilder()
	.ConfigureFunctionsWorkerDefaults(worker => worker.UseNewtonsoftJson())
	.ConfigureAppConfiguration(builder =>
	{
		builder
			.AddJsonFile("local.settings.json", true, true)
			.AddEnvironmentVariables();
		config = builder.Build();
	})
	.ConfigureServices(x =>
	{
		x.AddApplicationInsightsTelemetryWorkerService();
		x.ConfigureFunctionsApplicationInsights();
		x.Configure<JsonSerializerOptions>(options =>
		{
			options.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
			options.Converters.Add(new JsonStringEnumConverter());
			options.WriteIndented = true;
		});
		x.AddApplication();
		x.AddInfrastructure(config);
		x.Configure<LoggerFilterOptions>(options =>
		{
			// The Application Insights SDK adds a default logging filter that instructs ILogger to capture only Warning and more severe logs. Application Insights requires an explicit override.
			// Log levels can also be configured using appsettings.json. For more information, see https://learn.microsoft.com/en-us/azure/azure-monitor/app/worker-service#ilogger-logs
			var toRemove = options.Rules.FirstOrDefault(rule => rule.ProviderName == "Microsoft.Extensions.Logging.ApplicationInsights.ApplicationInsightsLoggerProvider");
			if (toRemove is not null)
				options.Rules.Remove(toRemove);
		});
	})
	.Build();

await host.RunAsync();
