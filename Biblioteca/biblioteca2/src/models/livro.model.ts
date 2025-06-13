import {Entity, model, property, hasMany} from '@loopback/repository';
import {Exemplares} from './exemplares.model';

@model()
export class Livro extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  codigoISBN?: number;

  @property({
    type: 'string',
    required: true,
  })
  titulo: string;

  @property({
    type: 'string',
    required: true,
  })
  autor: string;

  @property({
    type: 'date',
    required: true,
  })
  anoDePublicacao: string;

  @property({
    type: 'string',
    required: true,
  })
  edicao: string;

  @property({
    type: 'string',
    required: true,
  })
  genero: string;

  @hasMany(() => Exemplares, {keyTo: 'codigoISBN'})
  possui: Exemplares[];

  constructor(data?: Partial<Livro>) {
    super(data);
  }
}

export interface LivroRelations {
  // describe navigational properties here
}

export type LivroWithRelations = Livro & LivroRelations;
