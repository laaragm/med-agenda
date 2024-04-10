using MediatR;
using System.Net;
using System.Text.Json;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using MedAgenda.API.Extensions;
using MedAgenda.API.Authorization;
using MedAgenda.Application.Patients.GetPatient;
using MedAgenda.Application.Patients.GetPatients;
using MedAgenda.Application.Patients.CreatePatient;
using MedAgenda.Application.Patients.DeletePatient;
using MedAgenda.Application.Patients.UpdatePatient;

namespace MedAgenda.API.Functions.Patients;

// If an Authorize attribute is placed at class-level, requests to any function within the class must pass the authorization checks
//[Authorize(Scopes = new[] { Scopes.FunctionsAccess }, UserRoles = new[] { UserRoles.Admin })]
public class PatientsFunctions : FunctionBase
{
	private const string Route = "patients";
	private readonly ILogger _logger;
	private readonly ISender _sender;
	private readonly JsonSerializerOptions _jsonOptions;

	public PatientsFunctions(ILoggerFactory loggerFactory, ISender sender, IOptions<JsonSerializerOptions> jsonSerializerOptions) : base(jsonSerializerOptions)
	{
		_logger = loggerFactory.CreateLogger<PatientsFunctions>();
		_sender = sender;
		_jsonOptions = jsonSerializerOptions.Value;
	}

	[Function(nameof(CreatePatient))]
	public async Task<HttpResponseData> CreatePatient([HttpTrigger(AuthorizationLevel.Anonymous, "POST", Route = Route)]
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

			var createdBy = req.Headers.ExtractOid();
			var command = new CreatePatientCommand(
				patient.Name,
				patient.MedicalStateCode,
				patient.IsTermSigned,
				createdBy,
				patient.ReferenceId,
				patient.PeriodicityInDays,
				patient.PhoneNumber);
			var result = await _sender.Send(command, cancellationToken);

			if (result.IsFailure)
				return await ErrorResponse(req, result.Error, result.Error.StatusCode is null ? HttpStatusCode.BadRequest : (HttpStatusCode)result.Error.StatusCode);

			return await SuccessResponse(req, result.Value, HttpStatusCode.Created);
		}
		catch (Exception exception)
		{
			_logger.LogError(exception, "Error creating patient");
			return await HandleException(req, exception);
		}
	}

	[Function(nameof(GetPatients))]
	public async Task<HttpResponseData> GetPatients([HttpTrigger(AuthorizationLevel.Anonymous, "GET", Route = Route)]
		HttpRequestData req,
		FunctionContext context,
		CancellationToken cancellationToken)
	{
		try
		{
			_logger.LogInformation("Triggered GetPatients function.");

			var name = req.Query.Get("name");
			var includeReferences = req.Query.Get("includeReferences") == "true";

			var query = new GetPatientsQuery(name, includeReferences);
			var result = await _sender.Send(query, cancellationToken);

			if (result.IsFailure)
				return await ErrorResponse(req, result.Error, result.Error.StatusCode is null ? HttpStatusCode.BadRequest : (HttpStatusCode)result.Error.StatusCode);

			return await SuccessResponse(req, result.Value, HttpStatusCode.OK);
		}
		catch (Exception exception)
		{
			_logger.LogError(exception, "Error retrieving patients");
			return await HandleException(req, exception);
		}
	}

	[Function(nameof(DeletePatient))]
	public async Task<HttpResponseData> DeletePatient([HttpTrigger(AuthorizationLevel.Anonymous, "DELETE", Route = Route + "/{id}")]
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
				return await ErrorResponse(req, result.Error, result.Error.StatusCode is null ? HttpStatusCode.BadRequest : (HttpStatusCode)result.Error.StatusCode);

			return await SuccessResponse(req, result.IsSuccess, HttpStatusCode.OK);
		}
		catch (Exception exception)
		{
			_logger.LogError(exception, $"Error deleting patient with id = {id}");
			return await HandleException(req, exception);
		}
	}

	[Function(nameof(GetPatient))]
	public async Task<HttpResponseData> GetPatient([HttpTrigger(AuthorizationLevel.Anonymous, "GET", Route = Route + "/{id}")]
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
				return await ErrorResponse(req, result.Error, result.Error.StatusCode is null ? HttpStatusCode.BadRequest : (HttpStatusCode)result.Error.StatusCode);

			return await SuccessResponse(req, result.Value, HttpStatusCode.OK);
		}
		catch (Exception exception)
		{
			_logger.LogError(exception, $"Error retrieving patient with id = {id}");
			return await HandleException(req, exception);
		}
	}

	[Function(nameof(UpdatePatient))]
	public async Task<HttpResponseData> UpdatePatient([HttpTrigger(AuthorizationLevel.Anonymous, "PATCH", Route = Route + "/{id}")]
		HttpRequestData req,
		FunctionContext context,
		Guid id,
		CancellationToken cancellationToken)
	{
		try
		{
			_logger.LogInformation("Triggered UpdatePatient function.");

			var patient = await JsonSerializer.DeserializeAsync<UpdatePatientRequest>(req.Body, _jsonOptions);
			if (patient is null)
			{
				_logger.LogError("Error deserializing patient");
				return await StringResponse(req, "Error deserializing patient", HttpStatusCode.BadRequest);
			}

			var updatedBy = req.Headers.ExtractOid();
			var command = new UpdatePatientCommand(
				id,
				patient.Name,
				patient.MedicalStateCode,
				patient.IsTermSigned,
				updatedBy,
				patient.ReferenceId,
				patient.PeriodicityInDays,
				patient.PhoneNumber);
			var result = await _sender.Send(command, cancellationToken);

			if (result.IsFailure)
				return await ErrorResponse(req, result.Error, result.Error.StatusCode is null ? HttpStatusCode.BadRequest : (HttpStatusCode)result.Error.StatusCode);

			return await SuccessResponse(req, result.Value, HttpStatusCode.Created);
		}
		catch (Exception exception)
		{
			_logger.LogError(exception, $"Error updating patient with id = {id}");
			return await HandleException(req, exception);
		}
	}
}
