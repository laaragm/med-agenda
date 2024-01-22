using MedAgenda.Application.Abstractions.Messaging;

namespace MedAgenda.Application.Patients.GetPatients;

public sealed record GetPatientsQuery() : IQuery<IReadOnlyList<SummarizedPatientResponse>>;
