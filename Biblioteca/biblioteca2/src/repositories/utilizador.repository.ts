import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Utilizador, UtilizadorRelations, Emprestimo, Reserva} from '../models';
import {EmprestimoRepository} from './emprestimo.repository';
import {ReservaRepository} from './reserva.repository';

export class UtilizadorRepository extends DefaultCrudRepository<
  Utilizador,
  typeof Utilizador.prototype.numeroDeUtilizador,
  UtilizadorRelations
> {

  public readonly efetuaEmprestimo: HasManyRepositoryFactory<Emprestimo, typeof Utilizador.prototype.numeroDeUtilizador>;

  public readonly efetuaReserva: HasManyRepositoryFactory<Reserva, typeof Utilizador.prototype.numeroDeUtilizador>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('EmprestimoRepository') protected emprestimoRepositoryGetter: Getter<EmprestimoRepository>, @repository.getter('ReservaRepository') protected reservaRepositoryGetter: Getter<ReservaRepository>,
  ) {
    super(Utilizador, dataSource);
    this.efetuaReserva = this.createHasManyRepositoryFactoryFor('efetuaReserva', reservaRepositoryGetter,);
    this.registerInclusionResolver('efetuaReserva', this.efetuaReserva.inclusionResolver);
    this.efetuaEmprestimo = this.createHasManyRepositoryFactoryFor('efetuaEmprestimo', emprestimoRepositoryGetter,);
    this.registerInclusionResolver('efetuaEmprestimo', this.efetuaEmprestimo.inclusionResolver);
  }
}
