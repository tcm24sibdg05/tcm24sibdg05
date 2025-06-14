import {Entity, model, property, belongsTo} from '@loopback/repository';
import { Utilizador } from './utilizador.model';

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
    type: 'date',
    required: true,
  })
  hora: string;

  @property({
    type: 'date',
    required: true,
  })
  dataDeExpiracao: string;

  @belongsTo(() => Utilizador, {name: 'utilizador'})
  numeroDeUtilizador?: number;

  constructor(data?: Partial<Reserva>) {
    super(data);
  }
}

export interface ReservaRelations {
  // describe navigational properties here
}

export type ReservaWithRelations = Reserva & ReservaRelations;
