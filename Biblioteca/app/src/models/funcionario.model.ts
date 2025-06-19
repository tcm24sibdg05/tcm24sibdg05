import {Entity, model, property, hasMany} from '@loopback/repository';
import {Emprestimo} from './emprestimo.model';
import {Reserva} from './reserva.model';

@model({
  settings: {
    mysql: {
      table: 'funcionario',
    }
  }
})
export class Funcionario extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  codigoInterno?: number;

  @property({
    type: 'string',
    required: true,
  })
  nome: string;

  @property({
    type: 'string',
    required: true,
  })
  funcao: string;

  @hasMany(() => Emprestimo, {keyTo: 'codigoInterno'})
  emprestimos: Emprestimo[];

  @hasMany(() => Reserva, {keyTo: 'codigoInterno'})
  reservas: Reserva[];

  constructor(data?: Partial<Funcionario>) {
    super(data);
  }
}

export interface FuncionarioRelations {
  // describe navigational properties here
}

export type FuncionarioWithRelations = Funcionario & FuncionarioRelations;
