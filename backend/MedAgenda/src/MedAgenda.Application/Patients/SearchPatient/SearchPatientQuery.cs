using MedAgenda.Application.Abstractions.Messaging;

namespace MedAgenda.Application.Patients.SearchPatient;

public sealed record SearchPatientQuery(string Name, bool IncludeReferences) : IQuery<IReadOnlyList<SearchPatientResponse>>;
