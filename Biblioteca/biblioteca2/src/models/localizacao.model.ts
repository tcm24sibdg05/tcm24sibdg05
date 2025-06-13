import {Entity, model, property} from '@loopback/repository';

@model()
export class Localizacao extends Entity {
  @property({
    type: 'number',
    required: true,
  })
  codigoISBN: number;

  @property({
    type: 'number',
    required: true,
  })
  numeroDeCopia: number;

  @property({
    type: 'string',
    id: true,
    generated: false,
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


  constructor(data?: Partial<Localizacao>) {
    super(data);
  }
}

export interface LocalizacaoRelations {
  // describe navigational properties here
}

export type LocalizacaoWithRelations = Localizacao & LocalizacaoRelations;
