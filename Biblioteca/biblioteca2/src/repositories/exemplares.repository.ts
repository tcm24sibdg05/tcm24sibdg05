import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Exemplares, ExemplaresRelations, Livro} from '../models';
import {LivroRepository} from './livro.repository';

export class ExemplaresRepository extends DefaultCrudRepository<
  Exemplares,
  typeof Exemplares.prototype.numeroDeCopia,
  ExemplaresRelations
> {

  public readonly existe: BelongsToAccessor<Livro, typeof Exemplares.prototype.numeroDeCopia>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('LivroRepository') protected livroRepositoryGetter: Getter<LivroRepository>,
  ) {
    super(Exemplares, dataSource);
    this.existe = this.createBelongsToAccessorFor('existe', livroRepositoryGetter,);
    this.registerInclusionResolver('existe', this.existe.inclusionResolver);
  }
}
