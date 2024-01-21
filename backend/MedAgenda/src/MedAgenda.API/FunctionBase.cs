using System.Net;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.Azure.Functions.Worker.Http;
using MedAgenda.Application.Exceptions;
using static MedAgenda.API.FunctionBase;

namespace MedAgenda.API;

public abstract class FunctionBase
{
	private readonly IOptions<JsonSerializerOptions> _jsonSerializerOptions;

	protected FunctionBase(IOptions<JsonSerializerOptions> jsonSerializerOptions)
	{
		_jsonSerializerOptions = jsonSerializerOptions;
	}

	protected async Task<HttpResponseData> SuccessResponse<T>(HttpRequestData req, T data, HttpStatusCode statusCode)
		=> await CreateResponse(req, data, statusCode);

	protected async Task<HttpResponseData> ErrorResponse<T>(HttpRequestData req, T data, HttpStatusCode statusCode)
		=> await CreateResponse(req, data, statusCode);

	protected async Task<HttpResponseData> StringResponse(HttpRequestData req, string value, HttpStatusCode statusCode)
	{
		var response = req.CreateResponse(statusCode);
		response.Headers.Add("Content-Type", "text/plain; charset=utf-8");
		var bytes = Encoding.ASCII.GetBytes(value);
		return await ConvertBytesToHttpResponse(response, bytes);
	}

	protected async Task<HttpResponseData> HandleException(HttpRequestData req, Exception exception)
	{
		var exceptionDetails = GetExceptionDetails(exception);
		var problemDetails = new ProblemDetails
		{
			Status = exceptionDetails.Status,
			Type = exceptionDetails.Type,
			Title = exceptionDetails.Title,
			Detail = exceptionDetails.Detail,
		};

		if (exceptionDetails.Errors is not null)
			problemDetails.Extensions["errors"] = exceptionDetails.Errors;

		var response = await CreateResponse(req, problemDetails, (HttpStatusCode)exceptionDetails.Status);
		return response;
	}

	private async Task<HttpResponseData> CreateResponse<T>(HttpRequestData req, T data, HttpStatusCode statusCode)
	{
		var response = req.CreateResponse(statusCode);
		response.Headers.Add("Content-Type", "application/json");
		var bytes = Encoding.ASCII.GetBytes(JsonSerializer.Serialize(data, _jsonSerializerOptions.Value));
		return await ConvertBytesToHttpResponse(response, bytes);
	}

	private async Task<HttpResponseData> ConvertBytesToHttpResponse(HttpResponseData response, byte[] bytes)
	{
		await using var stream = new MemoryStream(bytes);
		await stream.CopyToAsync(response.Body);
		return response;
	}

	private static ExceptionDetails GetExceptionDetails(Exception exception)
	{
		return exception switch
		{
			ValidationException validationException => new ExceptionDetails(
				StatusCodes.Status400BadRequest,
				"ValidationFailure",
				"Validation error",
				"One or more validation errors has occurred",
				validationException.Errors),
			_ => new ExceptionDetails(
				StatusCodes.Status500InternalServerError,
				"ServerError",
				"Server error",
				"An unexpected error has occurred",
				null)
		};
	}

	internal record ExceptionDetails(int Status, string Type, string Title, string Detail, IEnumerable<object>? Errors);
}
