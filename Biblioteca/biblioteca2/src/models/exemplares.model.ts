import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Livro} from './livro.model';

@model()
export class Exemplares extends Entity {


  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  numeroDeCopia: number;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @belongsTo(() => Livro, {name: 'existe'})
  codigoISBN: number;

  constructor(data?: Partial<Exemplares>) {
    super(data);
  }
}

export interface ExemplaresRelations {
  // describe navigational properties here
}

export type ExemplaresWithRelations = Exemplares & ExemplaresRelations;
