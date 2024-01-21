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

		builder.Property(patient => patient.MedicalState)
			.HasConversion(medicalState => medicalState.Code, value => MedicalState.GetByCode(value));

		builder.Property(patient => patient.ReferencePatientId)
			.HasConversion(id => id != null ? id.Value : (Guid?)null, value => value != null ? new PatientId(value.Value) : null);

		builder
			.HasOne<Patient>() // A patient references another patient
			.WithMany() // Referenced patient can be referenced by multiple patients
			.HasForeignKey(p => p.ReferencePatientId);

		builder.Property(patient => patient.IsTermSigned)
			.HasConversion(isTermSigned => isTermSigned.Value, value => new IsTermSigned(value));

		builder.Property(patient => patient.PeriodicityInDays)
			.HasConversion(periodicity => periodicity != null ? periodicity.Value : (int?)null, value => value != null ? new PeriodicityInDays(value.Value) : null);

		builder.Property(patient => patient.CreatedOn);

		builder.Property(patient => patient.UpdatedBy);

		builder.Property(patient => patient.UpdatedOn);

		// Define a shadow property and instruct EF Core to interpret this column as a row version for implementing optimistic concurrency support
		builder.Property<uint>("Version").IsRowVersion();
	}
}
