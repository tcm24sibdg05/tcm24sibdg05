import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Emprestimo, EmprestimoRelations, Utilizador, Penalizacao} from '../models';
import {UtilizadorRepository} from './utilizador.repository';
import {PenalizacaoRepository} from './penalizacao.repository';

export class EmprestimoRepository extends DefaultCrudRepository<
  Emprestimo,
  typeof Emprestimo.prototype.codigo,
  EmprestimoRelations
> {

  public readonly efetuaEmprestimo: HasManyRepositoryFactory<Utilizador, typeof Emprestimo.prototype.codigo>;

  public readonly geraPenalizacao: HasManyRepositoryFactory<Penalizacao, typeof Emprestimo.prototype.codigo>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('UtilizadorRepository') protected utilizadorRepositoryGetter: Getter<UtilizadorRepository>, @repository.getter('PenalizacaoRepository') protected penalizacaoRepositoryGetter: Getter<PenalizacaoRepository>,
  ) {
    super(Emprestimo, dataSource);
    this.geraPenalizacao = this.createHasManyRepositoryFactoryFor('geraPenalizacao', penalizacaoRepositoryGetter,);
    this.registerInclusionResolver('geraPenalizacao', this.geraPenalizacao.inclusionResolver);
    this.efetuaEmprestimo = this.createHasManyRepositoryFactoryFor('efetuaEmprestimo', utilizadorRepositoryGetter,);
    this.registerInclusionResolver('efetuaEmprestimo', this.efetuaEmprestimo.inclusionResolver);
  }
}
