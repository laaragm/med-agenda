using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using MedAgenda.Application.Exceptions;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Azure.Functions.Worker.Middleware;

namespace MedAgenda.API.Middlewares;

internal sealed class ExceptionHandlingMiddleware : IFunctionsWorkerMiddleware
{
	public async Task Invoke(FunctionContext context, FunctionExecutionDelegate next)
	{
		try
		{
			await next(context);
		}
		catch (Exception exception)
		{
			var logger = context.GetLogger<ExceptionHandlingMiddleware>();
			logger.LogError(exception, "Exception occurred: {Message}", exception.Message);

			var exceptionDetails = GetExceptionDetails(exception);
			var response = context.GetHttpResponseData();
			var problemDetails = new ProblemDetails
			{
				Status = exceptionDetails.Status,
				Type = exceptionDetails.Type,
				Title = exceptionDetails.Title,
				Detail = exceptionDetails.Detail,
			};

			if (exceptionDetails.Errors is not null)
				problemDetails.Extensions["errors"] = exceptionDetails.Errors;

			if (response is not null)
			{
				response.StatusCode = (HttpStatusCode)exceptionDetails.Status;
				await response.WriteAsJsonAsync(problemDetails);
			}
		}
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