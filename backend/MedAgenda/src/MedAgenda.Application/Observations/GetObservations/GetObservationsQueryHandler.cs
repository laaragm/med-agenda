using MedAgenda.Domain.Abstractions;
using MedAgenda.Application.Abstractions.Data;
using MedAgenda.Application.Abstractions.Messaging;
using Dapper;
using MedAgenda.Application.Patients.GetPatients;
using MedAgenda.Domain.Patients;

namespace MedAgenda.Application.Observations.GetObservations;

public sealed class GetObservationsQueryHandler : IQueryHandler<GetObservationsQuery, IReadOnlyList<GetObservationsResponse>>
{
	private readonly ISqlConnectionFactory _sqlConnectionFactory;

	public GetObservationsQueryHandler(ISqlConnectionFactory sqlConnectionFactory)
	{
		_sqlConnectionFactory = sqlConnectionFactory;
	}

	public async Task<Result<IReadOnlyList<GetObservationsResponse>>> Handle(GetObservationsQuery request, CancellationToken cancellationToken)
	{
		using var connection = _sqlConnectionFactory.CreateConnection();

		const string sql = $"""
			SELECT
				o.Id AS Id,
				o.CreatedOn AS [Date],
				o.[Message] AS [Message]
			FROM [dbo].[Observations] AS o
			WHERE o.PatientId = @PatientId
			ORDER BY o.CreatedOn
			""";

		var observations = await connection.QueryAsync<GetObservationsResponse>(sql, new { request.PatientId });

		return observations.ToList();
	}
}
