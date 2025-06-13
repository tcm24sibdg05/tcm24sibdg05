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

  public readonly registaEmprestimo: HasManyRepositoryFactory<Emprestimo, typeof Funcionario.prototype.codigoInterno>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('EmprestimoRepository') protected emprestimoRepositoryGetter: Getter<EmprestimoRepository>,
  ) {
    super(Funcionario, dataSource);
    this.registaEmprestimo = this.createHasManyRepositoryFactoryFor('registaEmprestimo', emprestimoRepositoryGetter,);
    this.registerInclusionResolver('registaEmprestimo', this.registaEmprestimo.inclusionResolver);
  }
}
