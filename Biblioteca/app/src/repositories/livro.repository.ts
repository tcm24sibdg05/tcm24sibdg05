import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Livro, LivroRelations, Exemplar} from '../models';
import {ExemplarRepository} from './exemplar.repository';

export class LivroRepository extends DefaultCrudRepository<
  Livro,
  typeof Livro.prototype.codigoISBN,
  LivroRelations
> {

  public readonly exemplares: HasManyRepositoryFactory<Exemplar, typeof Livro.prototype.codigoISBN>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ExemplarRepository') protected exemplarRepositoryGetter: Getter<ExemplarRepository>,
  ) {
    super(Livro, dataSource);
    this.exemplares = this.createHasManyRepositoryFactoryFor('exemplares', exemplarRepositoryGetter,);
    this.registerInclusionResolver('exemplares', this.exemplares.inclusionResolver);
  }
}
