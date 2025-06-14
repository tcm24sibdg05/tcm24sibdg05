import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Reserva, ReservaRelations, Livro, Utilizador, Funcionario} from '../models';
import {LivroRepository} from './livro.repository';
import {UtilizadorRepository} from './utilizador.repository';
import {FuncionarioRepository} from './funcionario.repository';

export class ReservaRepository extends DefaultCrudRepository<
  Reserva,
  typeof Reserva.prototype.codigo,
  ReservaRelations
> {

  public readonly reserva: BelongsToAccessor<Livro, typeof Reserva.prototype.codigo>;

  public readonly utilizador: BelongsToAccessor<Utilizador, typeof Reserva.prototype.codigo>;

  public readonly funcionario: BelongsToAccessor<Funcionario, typeof Reserva.prototype.codigo>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('LivroRepository') protected livroRepositoryGetter: Getter<LivroRepository>, @repository.getter('UtilizadorRepository') protected utilizadorRepositoryGetter: Getter<UtilizadorRepository>, @repository.getter('FuncionarioRepository') protected funcionarioRepositoryGetter: Getter<FuncionarioRepository>,
  ) {
    super(Reserva, dataSource);
    this.funcionario = this.createBelongsToAccessorFor('funcionario', funcionarioRepositoryGetter,);
    this.registerInclusionResolver('funcionario', this.funcionario.inclusionResolver);
    this.utilizador = this.createBelongsToAccessorFor('utilizador', utilizadorRepositoryGetter,);
    this.registerInclusionResolver('utilizador', this.utilizador.inclusionResolver);
    this.reserva = this.createBelongsToAccessorFor('reserva', livroRepositoryGetter,);
    this.registerInclusionResolver('reserva', this.reserva.inclusionResolver);
  }
}
