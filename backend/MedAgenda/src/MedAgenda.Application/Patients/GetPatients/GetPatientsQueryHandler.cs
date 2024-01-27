using Dapper;
using MedAgenda.Domain.Abstractions;
using MedAgenda.Application.Abstractions.Data;
using MedAgenda.Application.Abstractions.Messaging;

namespace MedAgenda.Application.Patients.GetPatients;

public sealed class GetPatientsQueryHandler : IQueryHandler<GetPatientsQuery, IReadOnlyList<GetPatientsResponse>>
{
	private readonly ISqlConnectionFactory _sqlConnectionFactory;

	public GetPatientsQueryHandler(ISqlConnectionFactory sqlConnectionFactory)
	{
		_sqlConnectionFactory = sqlConnectionFactory;
	}

	public async Task<Result<IReadOnlyList<GetPatientsResponse>>> Handle(GetPatientsQuery request, CancellationToken cancellationToken)
	{
		using var connection = _sqlConnectionFactory.CreateConnection();

		var name = request.Name + "%";
		var condition = request.Name is not null ? "WHERE p.Name LIKE @name" : "";
		condition += request.IncludeReferences == true ? " OR r.Name LIKE @name" : "";
		var sql = $"""
			SELECT
				p.Id AS Id,
				p.Name AS Name,
				p.IsTermSigned AS IsTermSigned,
				r.Name as Reference
			FROM [dbo].[Patients] AS p
			LEFT JOIN [dbo].[Patients] AS r ON p.ReferencePatientId = r.Id
			{condition}
			ORDER BY p.Name
			""";
		
		var patients = await connection.QueryAsync<GetPatientsResponse>(sql, new { name });

		return patients.ToList();
	}
}
