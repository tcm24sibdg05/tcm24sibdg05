import {Entity, model, property, hasMany} from '@loopback/repository';
import {Emprestimo} from './emprestimo.model';

@model()
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

  @hasMany(() => Emprestimo, {keyTo: 'funcionario_emprestimo_fk'})
  emprestimos: Emprestimo[];

  constructor(data?: Partial<Funcionario>) {
    super(data);
  }
}

export interface FuncionarioRelations {
  // describe navigational properties here
}

export type FuncionarioWithRelations = Funcionario & FuncionarioRelations;
