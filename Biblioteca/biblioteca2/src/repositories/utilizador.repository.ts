import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Utilizador, UtilizadorRelations, Emprestimo, Reserva, Penalizacao} from '../models';
import {EmprestimoRepository} from './emprestimo.repository';
import {ReservaRepository} from './reserva.repository';
import {PenalizacaoRepository} from './penalizacao.repository';

export class UtilizadorRepository extends DefaultCrudRepository<
  Utilizador,
  typeof Utilizador.prototype.numeroDeUtilizador,
  UtilizadorRelations
> {

  public readonly efetuaEmprestimo: HasManyRepositoryFactory<Emprestimo, typeof Utilizador.prototype.numeroDeUtilizador>;

  public readonly efetuaReserva: HasManyRepositoryFactory<Reserva, typeof Utilizador.prototype.numeroDeUtilizador>;

  public readonly sofrePenalizacao: HasManyRepositoryFactory<Penalizacao, typeof Utilizador.prototype.numeroDeUtilizador>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('EmprestimoRepository') protected emprestimoRepositoryGetter: Getter<EmprestimoRepository>, @repository.getter('ReservaRepository') protected reservaRepositoryGetter: Getter<ReservaRepository>, @repository.getter('PenalizacaoRepository') protected penalizacaoRepositoryGetter: Getter<PenalizacaoRepository>,
  ) {
    super(Utilizador, dataSource);
    this.sofrePenalizacao = this.createHasManyRepositoryFactoryFor('sofrePenalizacao', penalizacaoRepositoryGetter,);
    this.registerInclusionResolver('sofrePenalizacao', this.sofrePenalizacao.inclusionResolver);
    this.efetuaReserva = this.createHasManyRepositoryFactoryFor('efetuaReserva', reservaRepositoryGetter,);
    this.registerInclusionResolver('efetuaReserva', this.efetuaReserva.inclusionResolver);
    this.efetuaEmprestimo = this.createHasManyRepositoryFactoryFor('efetuaEmprestimo', emprestimoRepositoryGetter,);
    this.registerInclusionResolver('efetuaEmprestimo', this.efetuaEmprestimo.inclusionResolver);
  }
}
