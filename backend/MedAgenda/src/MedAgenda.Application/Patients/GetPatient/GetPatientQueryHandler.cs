using Dapper;
using MedAgenda.Domain.Abstractions;
using MedAgenda.Application.Abstractions.Data;
using MedAgenda.Application.Abstractions.Messaging;

namespace MedAgenda.Application.Patients.GetPatient;

public sealed class GetPatientQueryHandler : IQueryHandler<GetPatientQuery, PatientResponse>
{
	private readonly ISqlConnectionFactory _sqlConnectionFactory;

	public GetPatientQueryHandler(ISqlConnectionFactory sqlConnectionFactory)
	{
		_sqlConnectionFactory = sqlConnectionFactory;
	}

	public async Task<Result<PatientResponse>> Handle(GetPatientQuery request, CancellationToken cancellationToken)
	{
		using var connection = _sqlConnectionFactory.CreateConnection();
		const string sql = """
			SELECT
				p.Id AS Id,
				p.Name AS Name,
				p.IsTermSigned AS IsTermSigned,
				p.PhoneNumber AS PhoneNumber,
				p.MedicalState AS MedicalStateCode,
				p.PeriodicityInDays AS PeriodicityInDays,
				r.Name as Reference
			FROM [dbo].[Patients] AS p
			LEFT JOIN [dbo].[Patients] AS r ON p.ReferencePatientId = r.Id
			WHERE p.Id = @id
			""";
		var patient = await connection.QueryFirstOrDefaultAsync<PatientResponse>(sql, new { request.Id });

		return patient;
	}
}
