using Microsoft.EntityFrameworkCore;
using MedAgenda.Domain.Abstractions;
using MedAgenda.Application.Exceptions;

namespace MedAgenda.Infrastructure;

public sealed class ApplicationDbContext : DbContext, IUnitOfWork
{
	public ApplicationDbContext(DbContextOptions options) : base(options)
	{
	}

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		// Configure the EF data model by scanning the assembly for entity configurations
		modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
		base.OnModelCreating(modelBuilder);
	}

	public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
	{
		try
		{
			var result = await base.SaveChangesAsync(cancellationToken);

			return result;
		}
		catch (DbUpdateConcurrencyException exception) // This exception is thrown by the database when there's a concurrency violation at the database level
		{
			// Wrap the EF Core specific exception in a custom exception for abstraction
			throw new ConcurrencyException("Concurrency exception occurred", exception);
		}
	}
}

