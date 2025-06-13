import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Reserva, ReservaRelations, Livro} from '../models';
import {LivroRepository} from './livro.repository';

export class ReservaRepository extends DefaultCrudRepository<
  Reserva,
  typeof Reserva.prototype.codigo,
  ReservaRelations
> {

  public readonly reserva: BelongsToAccessor<Livro, typeof Reserva.prototype.codigo>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('LivroRepository') protected livroRepositoryGetter: Getter<LivroRepository>,
  ) {
    super(Reserva, dataSource);
    this.reserva = this.createBelongsToAccessorFor('reserva', livroRepositoryGetter,);
    this.registerInclusionResolver('reserva', this.reserva.inclusionResolver);
  }
}
