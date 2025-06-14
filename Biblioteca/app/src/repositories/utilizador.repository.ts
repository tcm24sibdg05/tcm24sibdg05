import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Utilizador, UtilizadorRelations, Emprestimo} from '../models';
import {EmprestimoRepository} from './emprestimo.repository';

export class UtilizadorRepository extends DefaultCrudRepository<
  Utilizador,
  typeof Utilizador.prototype.numeroDeUtilizador,
  UtilizadorRelations
> {

  public readonly emprestimos: HasManyRepositoryFactory<Emprestimo, typeof Utilizador.prototype.numeroDeUtilizador>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('EmprestimoRepository') protected emprestimoRepositoryGetter: Getter<EmprestimoRepository>,
  ) {
    super(Utilizador, dataSource);
    this.emprestimos = this.createHasManyRepositoryFactoryFor('emprestimos', emprestimoRepositoryGetter,);
    this.registerInclusionResolver('emprestimos', this.emprestimos.inclusionResolver);
  }
}
