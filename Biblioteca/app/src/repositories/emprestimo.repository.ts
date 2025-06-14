import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Emprestimo, EmprestimoRelations, Penalizacao} from '../models';
import {PenalizacaoRepository} from './penalizacao.repository';

export class EmprestimoRepository extends DefaultCrudRepository<
  Emprestimo,
  typeof Emprestimo.prototype.codigoEmprestimo,
  EmprestimoRelations
> {

  public readonly penalizacaos: HasManyRepositoryFactory<Penalizacao, typeof Emprestimo.prototype.codigoEmprestimo>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('PenalizacaoRepository') protected penalizacaoRepositoryGetter: Getter<PenalizacaoRepository>,
  ) {
    super(Emprestimo, dataSource);
    this.penalizacaos = this.createHasManyRepositoryFactoryFor('penalizacaos', penalizacaoRepositoryGetter,);
    this.registerInclusionResolver('penalizacaos', this.penalizacaos.inclusionResolver);
  }
}
