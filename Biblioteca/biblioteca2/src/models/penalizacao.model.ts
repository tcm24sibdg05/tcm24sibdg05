import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Emprestimo} from './emprestimo.model';
import {Utilizador} from './utilizador.model';

@model()
export class Penalizacao extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  codigoDePenalizacao?: number;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'date',
    required: true,
  })
  data: string;

  @property({
    type: 'string',
    required: true,
  })
  motivo: string;

  @property({
    type: 'number',
    required: true,
  })
  codigoEmprestimo: number;

  @belongsTo(() => Emprestimo, {name: 'emprestimo'})
  codigo: number;

  @belongsTo(() => Utilizador, {name: 'utilizador'})
  numeroDeUtilizador: number;

  constructor(data?: Partial<Penalizacao>) {
    super(data);
  }
}

export interface PenalizacaoRelations {
  // describe navigational properties here
}

export type PenalizacaoWithRelations = Penalizacao & PenalizacaoRelations;
