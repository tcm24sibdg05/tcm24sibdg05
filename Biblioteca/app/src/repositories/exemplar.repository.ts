import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Exemplar, ExemplarRelations, Localizacao} from '../models';
import {LocalizacaoRepository} from './localizacao.repository';

export class ExemplarRepository extends DefaultCrudRepository<
  Exemplar,
  typeof Exemplar.prototype.numeroDeCopia,
  ExemplarRelations
> {

  public readonly localizacaos: HasManyRepositoryFactory<Localizacao, typeof Exemplar.prototype.numeroDeCopia>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('LocalizacaoRepository') protected localizacaoRepositoryGetter: Getter<LocalizacaoRepository>,
  ) {
    super(Exemplar, dataSource);
    this.localizacaos = this.createHasManyRepositoryFactoryFor('localizacaos', localizacaoRepositoryGetter,);
    this.registerInclusionResolver('localizacaos', this.localizacaos.inclusionResolver);
  }
}
