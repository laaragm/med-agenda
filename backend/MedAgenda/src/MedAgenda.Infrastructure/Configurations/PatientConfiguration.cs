using MedAgenda.Domain.Patients;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MedAgenda.Infrastructure.Configurations;

internal sealed class PatientConfiguration : IEntityTypeConfiguration<Patient>
{
	public void Configure(EntityTypeBuilder<Patient> builder)
	{
		builder.ToTable("patients");

		builder.HasKey(patient => patient.Id);

		// Define a conversion from the strongly typed id into the Guid value and also from the database value into the strongly typed id
		builder.Property(patient => patient.Id)
			.HasConversion(patient => patient.Value, value => new PatientId(value));

		builder.Property(patient => patient.Name)
			.HasMaxLength(100)
			.HasConversion(name => name.Value, value => new Name(value));

		builder.Property(patient => patient.PhoneNumber)
			.HasMaxLength(20)
			.HasConversion(phoneNumber => phoneNumber != null ? phoneNumber.Value : null, value => value != null ? new PhoneNumber(value) : null);

		//builder.Property(patient => patient.MedicalState)
		//	.HasConversion(medicalState => medicalState, value => new PhoneNumber(value));

		// Define a shadow property and instruct EF Core to interpret this column as a row version for implementing optimistic concurrency support
		builder.Property<uint>("Version").IsRowVersion();
	}
}
