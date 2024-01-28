using MediatR;
using System.Net;
using System.Text.Json;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using MedAgenda.Application.Observations.GetObservations;
using MedAgenda.Application.Observations.CreateObservation;
using MedAgenda.Application.Observations.DeleteObservation;

namespace MedAgenda.API.Functions.Observations;

internal class ObservationsFunctions : FunctionBase
{
	private const string Route = "observations";
	private readonly ILogger _logger;
	private readonly ISender _sender;
	private readonly JsonSerializerOptions _jsonOptions;

	public ObservationsFunctions(ILoggerFactory loggerFactory, ISender sender, IOptions<JsonSerializerOptions> jsonSerializerOptions) : base(jsonSerializerOptions)
	{
		_logger = loggerFactory.CreateLogger<ObservationsFunctions>();
		_sender = sender;
		_jsonOptions = jsonSerializerOptions.Value;
	}

	[Function(nameof(CreateObservation))]
	public async Task<HttpResponseData> CreateObservation([HttpTrigger(AuthorizationLevel.Function, "POST", Route = Route)]
		HttpRequestData req,
		FunctionContext context,
		CancellationToken cancellationToken)
	{
		try
		{
			_logger.LogInformation($"Triggered CreateObservation function.");

			var observation = await JsonSerializer.DeserializeAsync<CreateObservationRequest>(req.Body, _jsonOptions);
			if (observation is null)
			{
				_logger.LogError("Error deserializing observation");
				return await StringResponse(req, "Error deserializing observation", HttpStatusCode.BadRequest);
			}

			var createdBy = Guid.NewGuid(); // TODO: Get info from token
			var command = new CreateObservationCommand(observation.PatientId, observation.Message, createdBy);
			var result = await _sender.Send(command, cancellationToken);

			if (result.IsFailure)
				return await ErrorResponse(req, result.Error, HttpStatusCode.BadRequest);

			return await SuccessResponse(req, result.Value, HttpStatusCode.Created);
		}
		catch (Exception exception)
		{
			_logger.LogError(exception, "Error creating observation");
			return await HandleException(req, exception);
		}
	}

	[Function(nameof(GetObservations))]
	public async Task<HttpResponseData> GetObservations([HttpTrigger(AuthorizationLevel.Function, "GET", Route = Route)]
		HttpRequestData req,
		FunctionContext context,
		CancellationToken cancellationToken)
	{
		try
		{
			_logger.LogInformation("Triggered GetObservations function.");

			var patientId = req.Query.Get("patientId");
			if (patientId is null)
			{
				var message = "Patient id must be provided when retrieving observations";
				_logger.LogError(message);
				return await StringResponse(req, message, HttpStatusCode.BadRequest);
			}

			var query = new GetObservationsQuery(new Guid(patientId));
			var result = await _sender.Send(query, cancellationToken);

			if (result.IsFailure)
				return await ErrorResponse(req, result.Error, HttpStatusCode.BadRequest);

			return await SuccessResponse(req, result.Value, HttpStatusCode.OK);
		}
		catch (Exception exception)
		{
			_logger.LogError(exception, "Error retrieving observations");
			return await HandleException(req, exception);
		}
	}

	[Function(nameof(DeleteObservation))]
	public async Task<HttpResponseData> DeleteObservation([HttpTrigger(AuthorizationLevel.Function, "DELETE", Route = Route + "/{id}")]
		HttpRequestData req,
		FunctionContext context,
		Guid id,
		CancellationToken cancellationToken)
	{
		try
		{
			_logger.LogInformation("Triggered DeleteObservation function.");

			var query = new DeleteObservationCommand(id);
			var result = await _sender.Send(query, cancellationToken);

			if (result.IsFailure)
				return await ErrorResponse(req, result.Error, HttpStatusCode.BadRequest);

			return await SuccessResponse(req, result.IsSuccess, HttpStatusCode.OK);
		}
		catch (Exception exception)
		{
			_logger.LogError(exception, $"Error deleting observation with id = {id}");
			return await HandleException(req, exception);
		}
	}
}
