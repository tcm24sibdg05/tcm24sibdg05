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

  public readonly registaEmprestimo: HasManyRepositoryFactory<Emprestimo, typeof Funcionario.prototype.codigoInterno>;

  public readonly registaReserva: HasManyRepositoryFactory<Reserva, typeof Funcionario.prototype.codigoInterno>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('EmprestimoRepository') protected emprestimoRepositoryGetter: Getter<EmprestimoRepository>, @repository.getter('ReservaRepository') protected reservaRepositoryGetter: Getter<ReservaRepository>,
  ) {
    super(Funcionario, dataSource);
    this.registaReserva = this.createHasManyRepositoryFactoryFor('registaReserva', reservaRepositoryGetter,);
    this.registerInclusionResolver('registaReserva', this.registaReserva.inclusionResolver);
    this.registaEmprestimo = this.createHasManyRepositoryFactoryFor('registaEmprestimo', emprestimoRepositoryGetter,);
    this.registerInclusionResolver('registaEmprestimo', this.registaEmprestimo.inclusionResolver);
  }
}
