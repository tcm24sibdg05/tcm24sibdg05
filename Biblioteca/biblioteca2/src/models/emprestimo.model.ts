import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Utilizador} from './utilizador.model';
import {Penalizacao} from './penalizacao.model';

@model()
export class Emprestimo extends Entity {
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
  dataDeInicio: string;

  @property({
    type: 'date',
    required: true,
  })
  dataDeDevolucaoPrevista: string;

  @property({
    type: 'date',
    required: true,
  })
  dataDeDevolucaoReal: string;

  @property({
    type: 'boolean',
    required: true,
  })
  renovacao: boolean;


  @property({
    type: 'number',
    required: true,
  })
  codigoInterno: number;

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
    type: 'number',
  })
  numeroDeUtilizador?: number;

  @hasMany(() => Penalizacao, {keyTo: 'codigoEmprestimo'})
  geraPenalizacao: Penalizacao[];

  constructor(data?: Partial<Emprestimo>) {
    super(data);
  }
}

export interface EmprestimoRelations {
  // describe navigational properties here
}

export type EmprestimoWithRelations = Emprestimo & EmprestimoRelations;
