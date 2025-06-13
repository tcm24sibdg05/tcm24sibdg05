import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Emprestimo, EmprestimoRelations, Utilizador} from '../models';
import {UtilizadorRepository} from './utilizador.repository';

export class EmprestimoRepository extends DefaultCrudRepository<
  Emprestimo,
  typeof Emprestimo.prototype.codigo,
  EmprestimoRelations
> {

  public readonly efetuaEmprestimo: HasManyRepositoryFactory<Utilizador, typeof Emprestimo.prototype.codigo>;

  public readonly efetuado: BelongsToAccessor<Utilizador, typeof Emprestimo.prototype.codigo>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('UtilizadorRepository') protected utilizadorRepositoryGetter: Getter<UtilizadorRepository>,
  ) {
    super(Emprestimo, dataSource);
    this.efetuado = this.createBelongsToAccessorFor('efetuado', utilizadorRepositoryGetter,);
    this.registerInclusionResolver('efetuado', this.efetuado.inclusionResolver);
    this.efetuaEmprestimo = this.createHasManyRepositoryFactoryFor('efetuaEmprestimo', utilizadorRepositoryGetter,);
    this.registerInclusionResolver('efetuaEmprestimo', this.efetuaEmprestimo.inclusionResolver);
  }
}
