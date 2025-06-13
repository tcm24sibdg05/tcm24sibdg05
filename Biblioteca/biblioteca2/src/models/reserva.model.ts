import {Entity, model, property} from '@loopback/repository';

@model()
export class Reserva extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  codigo?: number;

  @property({
    type: 'date',
    required: true,
  })
  data: string;

  @property({
    type: 'number',
    required: true,
  })
  hora: number;

  @property({
    type: 'date',
    required: true,
  })
  dataDeExpiracao: string;

  @property({
    type: 'string',
    required: true,
  })
  numeroDeUtilizador: string;

  @property({
    type: 'number',
    required: true,
  })
  codigoISBN: number;

  @property({
    type: 'number',
    required: true,
  })
  codigoInterno: number;


  constructor(data?: Partial<Reserva>) {
    super(data);
  }
}

export interface ReservaRelations {
  // describe navigational properties here
}

export type ReservaWithRelations = Reserva & ReservaRelations;
