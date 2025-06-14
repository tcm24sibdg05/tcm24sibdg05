import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Funcionario, FuncionarioRelations, Emprestimo} from '../models';
import {EmprestimoRepository} from './emprestimo.repository';

export class FuncionarioRepository extends DefaultCrudRepository<
  Funcionario,
  typeof Funcionario.prototype.codigoInterno,
  FuncionarioRelations
> {

  public readonly emprestimos: HasManyRepositoryFactory<Emprestimo, typeof Funcionario.prototype.codigoInterno>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('EmprestimoRepository') protected emprestimoRepositoryGetter: Getter<EmprestimoRepository>,
  ) {
    super(Funcionario, dataSource);
    this.emprestimos = this.createHasManyRepositoryFactoryFor('emprestimos', emprestimoRepositoryGetter,);
    this.registerInclusionResolver('emprestimos', this.emprestimos.inclusionResolver);
  }
}
