import {Entity, model, property, hasMany} from '@loopback/repository';
import {Emprestimo} from './emprestimo.model';

@model()
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

  @hasMany(() => Emprestimo, {keyTo: 'utilizador_emprestimo_fk'})
  emprestimos: Emprestimo[];

  constructor(data?: Partial<Utilizador>) {
    super(data);
  }
}

export interface UtilizadorRelations {
  // describe navigational properties here
}

export type UtilizadorWithRelations = Utilizador & UtilizadorRelations;
