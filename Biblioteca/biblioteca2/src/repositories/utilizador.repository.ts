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

  public readonly efetuaEmprestimo: HasManyRepositoryFactory<Emprestimo, typeof Utilizador.prototype.numeroDeUtilizador>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('EmprestimoRepository') protected emprestimoRepositoryGetter: Getter<EmprestimoRepository>,
  ) {
    super(Utilizador, dataSource);
    this.efetuaEmprestimo = this.createHasManyRepositoryFactoryFor('efetuaEmprestimo', emprestimoRepositoryGetter,);
    this.registerInclusionResolver('efetuaEmprestimo', this.efetuaEmprestimo.inclusionResolver);
  }
}
