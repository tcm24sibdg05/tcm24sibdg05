import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Livro, LivroRelations, Exemplar, Emprestimo, Reserva} from '../models';
import {ExemplarRepository} from './exemplar.repository';
import {EmprestimoRepository} from './emprestimo.repository';
import {ReservaRepository} from './reserva.repository';

export class LivroRepository extends DefaultCrudRepository<
  Livro,
  typeof Livro.prototype.codigoISBN,
  LivroRelations
> {

  public readonly exemplares: HasManyRepositoryFactory<Exemplar, typeof Livro.prototype.codigoISBN>;

  public readonly emprestimos: HasManyRepositoryFactory<Emprestimo, typeof Livro.prototype.codigoISBN>;

  public readonly reservas: HasManyRepositoryFactory<Reserva, typeof Livro.prototype.codigoISBN>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ExemplarRepository') protected exemplarRepositoryGetter: Getter<ExemplarRepository>, @repository.getter('EmprestimoRepository') protected emprestimoRepositoryGetter: Getter<EmprestimoRepository>, @repository.getter('ReservaRepository') protected reservaRepositoryGetter: Getter<ReservaRepository>,
  ) {
    super(Livro, dataSource);
    this.reservas = this.createHasManyRepositoryFactoryFor('reservas', reservaRepositoryGetter,);
    this.registerInclusionResolver('reservas', this.reservas.inclusionResolver);
    this.emprestimos = this.createHasManyRepositoryFactoryFor('emprestimos', emprestimoRepositoryGetter,);
    this.registerInclusionResolver('emprestimos', this.emprestimos.inclusionResolver);
    this.exemplares = this.createHasManyRepositoryFactoryFor('exemplares', exemplarRepositoryGetter,);
    this.registerInclusionResolver('exemplares', this.exemplares.inclusionResolver);
  }
}
