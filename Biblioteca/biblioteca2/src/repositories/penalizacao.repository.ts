import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Penalizacao, PenalizacaoRelations, Emprestimo, Utilizador} from '../models';
import {EmprestimoRepository} from './emprestimo.repository';
import {UtilizadorRepository} from './utilizador.repository';

export class PenalizacaoRepository extends DefaultCrudRepository<
  Penalizacao,
  typeof Penalizacao.prototype.codigoDePenalizacao,
  PenalizacaoRelations
> {

  public readonly emprestimo: BelongsToAccessor<Emprestimo, typeof Penalizacao.prototype.codigoDePenalizacao>;

  public readonly utilizador: BelongsToAccessor<Utilizador, typeof Penalizacao.prototype.codigoDePenalizacao>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('EmprestimoRepository') protected emprestimoRepositoryGetter: Getter<EmprestimoRepository>, @repository.getter('UtilizadorRepository') protected utilizadorRepositoryGetter: Getter<UtilizadorRepository>,
  ) {
    super(Penalizacao, dataSource);
    this.utilizador = this.createBelongsToAccessorFor('utilizador', utilizadorRepositoryGetter,);
    this.registerInclusionResolver('utilizador', this.utilizador.inclusionResolver);
    this.emprestimo = this.createBelongsToAccessorFor('emprestimo', emprestimoRepositoryGetter,);
    this.registerInclusionResolver('emprestimo', this.emprestimo.inclusionResolver);
  }
}
