import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Localizacao, LocalizacaoRelations} from '../models';

export class LocalizacaoRepository extends DefaultCrudRepository<
  Localizacao,
  typeof Localizacao.prototype.corredor,
  LocalizacaoRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Localizacao, dataSource);
  }
}
