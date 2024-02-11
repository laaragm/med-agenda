using Microsoft.EntityFrameworkCore;
using MedAgenda.Domain.Abstractions;
using System.Linq.Expressions;

namespace MedAgenda.Infrastructure.Repositories;

internal abstract class Repository<TEntity, TEntityId> 
	where TEntity : Entity<TEntityId>
	where TEntityId : class
{
	protected readonly ApplicationDbContext DbContext;

	protected Repository(ApplicationDbContext dbContext)
	{
		DbContext = dbContext;
	}

	public async Task<IEnumerable<TEntity>> GetAsync(Expression<Func<TEntity, bool>> filter, CancellationToken cancellationToken = default)
		=> await DbContext.Set<TEntity>().Where(filter).ToListAsync(cancellationToken);

	public async Task<TEntity?> GetByIdAsync(TEntityId id, CancellationToken cancellationToken = default)
		=> await DbContext.Set<TEntity>().FirstOrDefaultAsync(user => user.Id == id, cancellationToken);

	public void Add(TEntity entity) => DbContext.Add(entity);

	public void Delete(TEntity entity) => DbContext.Remove(entity);

	public void Update(TEntity entity) => DbContext.Update(entity);
}
