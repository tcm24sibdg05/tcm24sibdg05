import {Entity, model, property} from '@loopback/repository';

@model()
export class Exemplar extends Entity {
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
  codigoISBN: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;


  constructor(data?: Partial<Exemplar>) {
    super(data);
  }
}

export interface ExemplarRelations {
  // describe navigational properties here
}

export type ExemplarWithRelations = Exemplar & ExemplarRelations;
