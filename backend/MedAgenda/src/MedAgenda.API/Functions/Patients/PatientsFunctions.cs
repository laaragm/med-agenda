using MediatR;
using System.Net;
using System.Text.Json;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using MedAgenda.Application.Patients.CreatePatient;

namespace MedAgenda.API.Functions.Patients
{
	public class Patients : FunctionBase
	{
		private const string Route = "patients";
		private readonly ILogger _logger;
		private readonly ISender _sender;
		private readonly IOptions<JsonSerializerOptions> _jsonSerializerOptions;

		public Patients(ILoggerFactory loggerFactory, ISender sender, IOptions<JsonSerializerOptions> jsonSerializerOptions) : base(jsonSerializerOptions)
		{
			_logger = loggerFactory.CreateLogger<Patients>();
			_sender = sender;
			_jsonSerializerOptions = jsonSerializerOptions;
		}

		[Function(nameof(CreatePatient))]
		public async Task<HttpResponseData> CreatePatient([HttpTrigger(AuthorizationLevel.Function, "POST", Route = Route)]
			HttpRequestData req,
			FunctionContext context,
			CancellationToken cancellationToken)
		{
			try
			{
				_logger.LogInformation("Triggered CreatePatient function.");
				var patient = await JsonSerializer.DeserializeAsync<CreatePatientRequest>(req.Body, _jsonSerializerOptions.Value);
				if (patient is null)
				{
					_logger.LogError("Error deserializing patient");
					return await StringResponse(req, HttpStatusCode.BadRequest, "Error deserializing patient");
				}

				var createdBy = Guid.NewGuid(); // TODO: Get info from token
				var command = new CreatePatientCommand(
					patient.Name,
					patient.MedicalStateCode,
					patient.IsTermSigned,
					createdBy,
					patient.ReferencePatientId,
					patient.PeriodicityInDays,
					patient.PhoneNumber);
				var result = await _sender.Send(command, cancellationToken);

				if (result.IsFailure)
					return await StringResponse(req, HttpStatusCode.BadRequest, "Error creating patient");

				return await OkObjectResponse(req, result);
			}
			catch (Exception e)
			{
				_logger.LogError(e, "Error creating patient");
				return await StringResponse(req, HttpStatusCode.BadRequest, "Error creating patient");

			}
		}
	}
}
