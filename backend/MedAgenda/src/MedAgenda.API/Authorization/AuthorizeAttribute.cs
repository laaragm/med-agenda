namespace MedAgenda.API.Authorization;

// Set at Function class or method level to set what scopes/user roles/app roles are required in requests.
// If you do not specify app roles, calls without user context will fail.
// Same goes for scopes/user roles;
// Calls with user context will fail if both are not specified.
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class AuthorizeAttribute : Attribute
{
	// Defines which scopes (aka delegated permissions) are accepted. 
	public string[] Scopes { get; set; } = Array.Empty<string>();

	// Defines which user roles are accepted.
	public string[] UserRoles { get; set; } = Array.Empty<string>();

	// Defines which app roles (aka application permissions) are accepted.
	public string[] AppRoles { get; set; } = Array.Empty<string>();
}