using System.Data;

namespace MedAgenda.Application.Abstractions.Data;

public interface ISqlConnectionFactory
{
	IDbConnection CreateConnection();
}
