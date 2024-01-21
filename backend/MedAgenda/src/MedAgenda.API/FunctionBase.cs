using System.Net;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Options;
using Microsoft.Azure.Functions.Worker.Http;

namespace MedAgenda.API;

public abstract class FunctionBase
{
	private readonly IOptions<JsonSerializerOptions> _jsonSerializerOptions;

	protected FunctionBase(IOptions<JsonSerializerOptions> jsonSerializerOptions)
	{
		_jsonSerializerOptions = jsonSerializerOptions;
	}

	protected async Task<HttpResponseData> OkObjectResponse(HttpRequestData req, object? responseObject)
	{
		var response = req.CreateResponse(HttpStatusCode.OK);
		response.Headers.Add("Content-Type", "application/json");
		var bytes = Encoding.ASCII.GetBytes(JsonSerializer.Serialize(responseObject, _jsonSerializerOptions.Value));
		await using var stream = new MemoryStream(bytes);
		await stream.CopyToAsync(response.Body);
		return response;
	}

	protected static async Task<HttpResponseData> StringResponse(HttpRequestData req, HttpStatusCode statusCode,
		string value)
	{
		var response = req.CreateResponse(statusCode);
		response.Headers.Add("Content-Type", "text/plain; charset=utf-8");
		var bytes = Encoding.ASCII.GetBytes(value);
		await using var stream = new MemoryStream(bytes);
		await stream.CopyToAsync(response.Body);
		return response;
	}
}
