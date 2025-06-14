import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Localizacao, LocalizacaoRelations} from '../models';

export class LocalizacaoRepository extends DefaultCrudRepository<
  Localizacao,
  typeof Localizacao.prototype.codigoISBN,
  LocalizacaoRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Localizacao, dataSource);
  }
}
