using MedAgenda.Domain.Observations;
using MedAgenda.Domain.Patients;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MedAgenda.Infrastructure.Configurations;

internal sealed class ObservationConfiguration : IEntityTypeConfiguration<Observation>
{
	public void Configure(EntityTypeBuilder<Observation> builder)
	{
		builder.ToTable("Observations");

		builder.HasKey(observation => observation.Id);

		// Define a conversion from the strongly typed id into the Guid value and also from the database value into the strongly typed id
		builder.Property(observation => observation.Id)
			.HasConversion(observation => observation.Value, value => new ObservationId(value));

		builder.Property(observation => observation.Message)
			.HasConversion(name => name.Value, value => new Message(value));

		builder.Property(observation => observation.CreatedBy);

		builder.Property(observation => observation.CreatedOn);

		builder.Property(observation => observation.UpdatedBy);

		builder.Property(observation => observation.UpdatedOn);

		builder.HasOne<Patient>() // An observation has one patient associated with it
			.WithMany() // A patient can have many observations
			.HasForeignKey(observation => observation.PatientId);

		// Define a shadow property and instruct EF Core to interpret this column as a row version for implementing optimistic concurrency support
		builder.Property<uint>("Version").IsRowVersion();
	}
}
