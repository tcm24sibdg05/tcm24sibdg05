import {Entity, model, property, hasMany} from '@loopback/repository';
import {Emprestimo} from './emprestimo.model';
import {Reserva} from './reserva.model';

@model({
  settings: {
    mysql: {
      table: 'utilizador',
    }
  }
})
export class Utilizador extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  numeroDeUtilizador?: number;

  @property({
    type: 'string',
    required: true,
  })
  nome: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  contacto: string;

  @hasMany(() => Emprestimo, {keyTo: 'numeroDeUtilizador'})
  emprestimos: Emprestimo[];

  @hasMany(() => Reserva, {keyTo: 'numeroDeUtilizador'})
  efetuaReserva: Reserva[];

  constructor(data?: Partial<Utilizador>) {
    super(data);
    
  }
}

export interface UtilizadorRelations {
  // describe navigational properties here
}

export type UtilizadorWithRelations = Utilizador & UtilizadorRelations;
