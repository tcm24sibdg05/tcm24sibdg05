import {Entity, model, property, belongsTo} from '@loopback/repository';
import { Exemplar } from './exemplar.model';


@model({
  settings: {
    mysql: {
      table: 'localizacao',
    }
  }
})
export class Localizacao extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  codigoISBN: string;

  @property({
    type: 'string',
    required: true,
  })
  corredor: string;

  @property({
    type: 'string',
    required: true,
  })
  estante: string;

  @property({
    type: 'string',
    required: true,
  })
  prateleira: string;

  @belongsTo(() => Exemplar, {name: 'exemplar'})
  numeroDeCopia?: number;

  constructor(data?: Partial<Localizacao>) {
    super(data);
  }
}

export interface LocalizacaoRelations {
  // describe navigational properties here
}

export type LocalizacaoWithRelations = Localizacao & LocalizacaoRelations;
