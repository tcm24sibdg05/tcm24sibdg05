import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Penalizacao, PenalizacaoRelations} from '../models';

export class PenalizacaoRepository extends DefaultCrudRepository<
  Penalizacao,
  typeof Penalizacao.prototype.codigoDePenalizacao,
  PenalizacaoRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Penalizacao, dataSource);
  }
}
