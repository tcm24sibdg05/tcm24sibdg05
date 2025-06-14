import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Exemplar, ExemplarRelations} from '../models';

export class ExemplarRepository extends DefaultCrudRepository<
  Exemplar,
  typeof Exemplar.prototype.numeroDeCopia,
  ExemplarRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Exemplar, dataSource);
  }
}
