using MediatR;
using MedAgenda.Domain.Abstractions;

namespace MedAgenda.Application.Abstractions.Messaging;

// Generic interface for queries in CQRS, extending IRequest to encapsulate query details and standardize response as Result<TResponse>
public interface IQuery<TResponse> : IRequest<Result<TResponse>>
{
}
