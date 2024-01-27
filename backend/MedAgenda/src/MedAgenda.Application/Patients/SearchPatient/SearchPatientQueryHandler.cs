using MedAgenda.Domain.Abstractions;
using MedAgenda.Application.Abstractions.Data;
using MedAgenda.Application.Abstractions.Messaging;
using Dapper;
using MedAgenda.Application.Patients.GetPatients;

namespace MedAgenda.Application.Patients.SearchPatient;

public sealed class SearchPatientQueryHandler : IQueryHandler<SearchPatientQuery, IReadOnlyList<SearchPatientResponse>>
{
	private readonly ISqlConnectionFactory _sqlConnectionFactory;

	public SearchPatientQueryHandler(ISqlConnectionFactory sqlConnectionFactory)
	{
		_sqlConnectionFactory = sqlConnectionFactory;
	}

	public async Task<Result<IReadOnlyList<SearchPatientResponse>>> Handle(SearchPatientQuery request, CancellationToken cancellationToken)
	{
		using var connection = _sqlConnectionFactory.CreateConnection();
		var additionalCondition = request.IncludeReferences ? "OR r.Name LIKE '@name%'" : "";
		var sql = $"""
			SELECT
				p.Id AS Id,
				p.Name AS Name,
				p.IsTermSigned AS IsTermSigned,
				r.Name as Reference
			FROM [dbo].[Patients] AS p
			LEFT JOIN [dbo].[Patients] AS r ON p.ReferencePatientId = r.Id
			WHERE p.Name LIKE '@name%' {additionalCondition}
			ORDER BY p.Name
			""";
		var patients = await connection.QueryAsync<SearchPatientResponse>(sql, new { request.Name });

		return patients.ToList();
	}
}
