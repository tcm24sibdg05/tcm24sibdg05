import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Livro} from './livro.model';
import {Utilizador} from './utilizador.model';
import {Funcionario} from './funcionario.model';

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
  @belongsTo(() => Livro, {name: 'reserva'})
  codigoISBN: number;

  @belongsTo(() => Utilizador, {name: 'utilizador'})
  numeroDeUtilizador: number;

  @belongsTo(() => Funcionario, {name: 'funcionario'})
  codigoInterno: number;

  constructor(data?: Partial<Reserva>) {
    super(data);
  }
}

export interface ReservaRelations {
  // describe navigational properties here
}

export type ReservaWithRelations = Reserva & ReservaRelations;
