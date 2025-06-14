import {Entity, model, property} from '@loopback/repository';

@model()
export class Livro extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  codigoISBN: string;

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
    type: 'number',
    required: true,
  })
  anoDePublicacao: number;

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


  constructor(data?: Partial<Livro>) {
    super(data);
  }
}

export interface LivroRelations {
  // describe navigational properties here
}

export type LivroWithRelations = Livro & LivroRelations;
