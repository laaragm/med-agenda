﻿using MediatR;
using MedAgenda.Domain.Abstractions;

namespace MedAgenda.Application.Abstractions.Messaging;

// Generic interface for handling queries in CQRS, extending IRequestHandler to return Result<TResponse> and ensuring TQuery implements IQuery<TResponse>
public interface IQueryHandler<TQuery, TResponse> : IRequestHandler<TQuery, Result<TResponse>> where TQuery : IQuery<TResponse>
{
}
