using MedAgenda.Application.Abstractions.Messaging;
using MedAgenda.Application.Patients.GetPatients;

namespace MedAgenda.Application.Observations.GetObservations;

public sealed record GetObservationsQuery(Guid PatientId) : IQuery<IReadOnlyList<GetObservationsResponse>>;
