import {Entity, model, property, belongsTo} from '@loopback/repository';
import { Emprestimo } from './emprestimo.model';

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

  @belongsTo(() => Emprestimo, {name: 'emprestimo'})
  codigoEmprestimo?: number;

  constructor(data?: Partial<Penalizacao>) {
    super(data);
  }
}

export interface PenalizacaoRelations {
  // describe navigational properties here
}

export type PenalizacaoWithRelations = Penalizacao & PenalizacaoRelations;
