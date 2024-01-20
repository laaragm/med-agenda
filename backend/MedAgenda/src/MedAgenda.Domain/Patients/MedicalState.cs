namespace MedAgenda.Domain.Patients;

public record MedicalState
{
	public static readonly MedicalState Normal = new(1);
	public static readonly MedicalState Priority = new(2);
	public static readonly MedicalState Critical = new(3);
	public static readonly IReadOnlyCollection<MedicalState> All = new[] { Normal, Priority, Critical };

	public int Code { get; init; }

	private MedicalState(int code)
	{
		Code = code;
	}

	public static MedicalState GetByCode(int code)
	{
		return All.FirstOrDefault(x => x.Code == code) ?? throw new ApplicationException("The medical state code is invalid");
	}
}
