import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Livro, LivroRelations} from '../models';

export class LivroRepository extends DefaultCrudRepository<
  Livro,
  typeof Livro.prototype.codigoISBN,
  LivroRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Livro, dataSource);
  }
}
