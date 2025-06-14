import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Emprestimo, EmprestimoRelations, Utilizador, Penalizacao, Funcionario} from '../models';
import {UtilizadorRepository} from './utilizador.repository';
import {PenalizacaoRepository} from './penalizacao.repository';
import {FuncionarioRepository} from './funcionario.repository';

export class EmprestimoRepository extends DefaultCrudRepository<
  Emprestimo,
  typeof Emprestimo.prototype.codigo,
  EmprestimoRelations
> {

  public readonly efetuaEmprestimo: HasManyRepositoryFactory<Utilizador, typeof Emprestimo.prototype.codigo>;

  public readonly geraPenalizacao: HasManyRepositoryFactory<Penalizacao, typeof Emprestimo.prototype.codigo>;

  public readonly utilizador: BelongsToAccessor<Utilizador, typeof Emprestimo.prototype.codigo>;

  public readonly funcionario: BelongsToAccessor<Funcionario, typeof Emprestimo.prototype.codigo>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('UtilizadorRepository') protected utilizadorRepositoryGetter: Getter<UtilizadorRepository>, @repository.getter('PenalizacaoRepository') protected penalizacaoRepositoryGetter: Getter<PenalizacaoRepository>, @repository.getter('FuncionarioRepository') protected funcionarioRepositoryGetter: Getter<FuncionarioRepository>,
  ) {
    super(Emprestimo, dataSource);
    this.funcionario = this.createBelongsToAccessorFor('funcionario', funcionarioRepositoryGetter,);
    this.registerInclusionResolver('funcionario', this.funcionario.inclusionResolver);
    this.utilizador = this.createBelongsToAccessorFor('utilizador', utilizadorRepositoryGetter,);
    this.registerInclusionResolver('utilizador', this.utilizador.inclusionResolver);
    this.geraPenalizacao = this.createHasManyRepositoryFactoryFor('geraPenalizacao', penalizacaoRepositoryGetter,);
    this.registerInclusionResolver('geraPenalizacao', this.geraPenalizacao.inclusionResolver);
    this.efetuaEmprestimo = this.createHasManyRepositoryFactoryFor('efetuaEmprestimo', utilizadorRepositoryGetter,);
    this.registerInclusionResolver('efetuaEmprestimo', this.efetuaEmprestimo.inclusionResolver);
  }
}
