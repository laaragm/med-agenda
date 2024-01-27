using MedAgenda.Application.Abstractions.Messaging;

namespace MedAgenda.Application.Patients.GetPatients;

public sealed record GetPatientsQuery(string? Name, bool? IncludeReferences) : IQuery<IReadOnlyList<GetPatientsResponse>>;
