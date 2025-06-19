import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import { Livro } from './livro.model';
import {Localizacao} from './localizacao.model';

@model({
  settings: {
    mysql: {
      table: 'exemplar',
    }
  }
})
export class Exemplar extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  numeroDeCopia: number;

  @belongsTo(() => Livro, {name: 'livro'})
  codigoISBN: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @hasMany(() => Localizacao, {keyTo: 'numeroDeCopia'})
  localizacaos: Localizacao[];

  constructor(data?: Partial<Exemplar>) {
    super(data);
  }
}

export interface ExemplarRelations {
  // describe navigational properties here
}

export type ExemplarWithRelations = Exemplar & ExemplarRelations;
