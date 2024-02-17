using System.IdentityModel.Tokens.Jwt;
using Microsoft.Azure.Functions.Worker.Http;

namespace MedAgenda.API.Extensions;

public static class TokenExtensions
{
	public static Guid ExtractOid(this HttpHeadersCollection headers)
	{
		var authorizationHeader = headers.FirstOrDefault(x => x.Key == "Authorization");
		var authorizationHeaderValue = authorizationHeader.Value.Any() ? authorizationHeader.Value.FirstOrDefault() : null;
		if (authorizationHeaderValue == null)
			throw new ArgumentException("Invalid or missing authorization header value.");
	
		var stream = authorizationHeaderValue.Replace("Bearer ", "");
		var handler = new JwtSecurityTokenHandler();
		var token = handler.ReadToken(stream) as JwtSecurityToken;
		var oidClaim = token!.Claims.FirstOrDefault(a => a.Type.Equals("oid"));
		if (oidClaim == null)
			throw new InvalidOperationException("OID claim is missing");
		
		return Guid.Parse(oidClaim.Value);
	}
}
