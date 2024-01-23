using MediatR;
using System.Net;
using System.Text.Json;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using MedAgenda.Application.Patients.GetPatients;
using MedAgenda.Application.Patients.CreatePatient;
using MedAgenda.Application.Patients.DeletePatient;
using Microsoft.AspNetCore.Routing;
using MedAgenda.Application.Patients.GetPatient;

namespace MedAgenda.API.Functions.Patients;

public class Patients : FunctionBase
{
	private const string Route = "patients";
	private readonly ILogger _logger;
	private readonly ISender _sender;
	private readonly JsonSerializerOptions _jsonOptions;

	public Patients(ILoggerFactory loggerFactory, ISender sender, IOptions<JsonSerializerOptions> jsonSerializerOptions) : base(jsonSerializerOptions)
	{
		_logger = loggerFactory.CreateLogger<Patients>();
		_sender = sender;
		_jsonOptions = jsonSerializerOptions.Value;
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
			var patient = await JsonSerializer.DeserializeAsync<CreatePatientRequest>(req.Body, _jsonOptions);
			if (patient is null)
			{
				_logger.LogError("Error deserializing patient");
				return await StringResponse(req, "Error deserializing patient", HttpStatusCode.BadRequest);
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
				return await ErrorResponse(req, result.Error, HttpStatusCode.BadRequest);

			return await SuccessResponse(req, result.Value, HttpStatusCode.Created);
		}
		catch (Exception exception)
		{
			_logger.LogError(exception, "Error creating patient");
			return await HandleException(req, exception);
		}
	}

	[Function(nameof(GetPatients))]
	public async Task<HttpResponseData> GetPatients([HttpTrigger(AuthorizationLevel.Function, "GET", Route = Route)]
		HttpRequestData req,
		FunctionContext context,
		CancellationToken cancellationToken)
	{
		try
		{
			_logger.LogInformation("Triggered GetPatients function.");

			var query = new GetPatientsQuery();
			var result = await _sender.Send(query, cancellationToken);

			if (result.IsFailure)
				return await ErrorResponse(req, result.Error, HttpStatusCode.BadRequest);

			return await SuccessResponse(req, result.Value, HttpStatusCode.OK);
		}
		catch (Exception exception)
		{
			_logger.LogError(exception, "Error retrieving patients");
			return await HandleException(req, exception);
		}
	}

	[Function(nameof(DeletePatient))]
	public async Task<HttpResponseData> DeletePatient([HttpTrigger(AuthorizationLevel.Function, "DELETE", Route = Route + "/{id}")]
		HttpRequestData req,
		FunctionContext context,
		Guid id,
		CancellationToken cancellationToken)
	{
		try
		{
			_logger.LogInformation("Triggered DeletePatient function.");

			var query = new DeletePatientCommand(id);
			var result = await _sender.Send(query, cancellationToken);

			if (result.IsFailure)
				return await ErrorResponse(req, result.Error, HttpStatusCode.BadRequest);

			return await SuccessResponse(req, result.IsSuccess, HttpStatusCode.OK);
		}
		catch (Exception exception)
		{
			_logger.LogError(exception, $"Error deleting patient with id = {id}");
			return await HandleException(req, exception);
		}
	}

	[Function(nameof(GetPatient))]
	public async Task<HttpResponseData> GetPatient([HttpTrigger(AuthorizationLevel.Function, "GET", Route = Route + "/{id}")]
		HttpRequestData req,
		FunctionContext context,
		Guid id,
		CancellationToken cancellationToken)
	{
		try
		{
			_logger.LogInformation("Triggered GetPatient function.");

			var query = new GetPatientQuery(id);
			var result = await _sender.Send(query, cancellationToken);

			if (result.IsFailure)
				return await ErrorResponse(req, result.Error, HttpStatusCode.NotFound);

			return await SuccessResponse(req, result.Value, HttpStatusCode.OK);
		}
		catch (Exception exception)
		{
			_logger.LogError(exception, $"Error retrieving patient with id = {id}");
			return await HandleException(req, exception);
		}
	}
}
