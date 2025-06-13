import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Livro, LivroRelations, Exemplares} from '../models';
import {ExemplaresRepository} from './exemplares.repository';

export class LivroRepository extends DefaultCrudRepository<
  Livro,
  typeof Livro.prototype.codigoISBN,
  LivroRelations
> {

  public readonly possui: HasManyRepositoryFactory<Exemplares, typeof Livro.prototype.codigoISBN>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ExemplaresRepository') protected exemplaresRepositoryGetter: Getter<ExemplaresRepository>,
  ) {
    super(Livro, dataSource);
    this.possui = this.createHasManyRepositoryFactoryFor('possui', exemplaresRepositoryGetter,);
    this.registerInclusionResolver('possui', this.possui.inclusionResolver);
  }
}
