using MedAgenda.Application.Abstractions.Messaging;

namespace MedAgenda.Application.Patients.GetPatient;

public sealed record GetPatientQuery(Guid Id) : IQuery<GetPatientResponse>;
