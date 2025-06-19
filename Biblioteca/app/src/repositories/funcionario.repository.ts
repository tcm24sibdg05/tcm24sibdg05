import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Funcionario, FuncionarioRelations, Emprestimo, Reserva} from '../models';
import {EmprestimoRepository} from './emprestimo.repository';
import {ReservaRepository} from './reserva.repository';

export class FuncionarioRepository extends DefaultCrudRepository<
  Funcionario,
  typeof Funcionario.prototype.codigoInterno,
  FuncionarioRelations
> {

  public readonly emprestimos: HasManyRepositoryFactory<Emprestimo, typeof Funcionario.prototype.codigoInterno>;

  public readonly reservas: HasManyRepositoryFactory<Reserva, typeof Funcionario.prototype.codigoInterno>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('EmprestimoRepository') protected emprestimoRepositoryGetter: Getter<EmprestimoRepository>, @repository.getter('ReservaRepository') protected reservaRepositoryGetter: Getter<ReservaRepository>,
  ) {
    super(Funcionario, dataSource);
    this.reservas = this.createHasManyRepositoryFactoryFor('reservas', reservaRepositoryGetter,);
    this.registerInclusionResolver('reservas', this.reservas.inclusionResolver);
    this.emprestimos = this.createHasManyRepositoryFactoryFor('emprestimos', emprestimoRepositoryGetter,);
    this.registerInclusionResolver('emprestimos', this.emprestimos.inclusionResolver);
  }
}
