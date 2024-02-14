using System.Security.Claims;

namespace MedAgenda.API.Middlewares;

// Holds the authenticated user principal for the request along with the access token they used.
public class JwtPrincipalFeature
{
	public JwtPrincipalFeature(ClaimsPrincipal principal, string accessToken)
	{
		Principal = principal;
		AccessToken = accessToken;
	}

	public ClaimsPrincipal Principal { get; }

	// The access token that was used for this request. Can be used to acquire further access tokens with the on-behalf-of flow.
	public string AccessToken { get; }
}