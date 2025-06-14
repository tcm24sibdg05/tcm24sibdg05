import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Utilizador} from './utilizador.model';
import {Funcionario} from './funcionario.model';
import { Livro } from './livro.model';

@model()
export class Emprestimo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  codigoEmprestimo?: number;

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
    required: false,
  })
  dataDeDevolucaoReal: string;

  @property({
    type: 'boolean',
    required: true,
  })
  renovacao: boolean;

  @belongsTo(() => Utilizador, {name: 'utilizador'})
  numeroDeUtilizador: number;

  @belongsTo(() => Funcionario, {name: 'funcionario'})
  codigoInterno: number;

  @belongsTo(() => Livro, {name: 'livro'})
  codigoISBN: string;

  @property({
    type: 'number',
    required: true,
  })
  numeroDeCopia: number;

  

  // @property({
  //   type: 'string',
  // })
  // livro_emprestimo_fk?: string;

  // @property({
  //   type: 'number',
  // })
  // funcionario_emprestimo_fk?: number;

  // @property({
  //   type: 'number',
  // })
  // utilizador_emprestimo_fk?: number;

  constructor(data?: Partial<Emprestimo>) {
    super(data);
  }
}

export interface EmprestimoRelations {
  // describe navigational properties here
}

export type EmprestimoWithRelations = Emprestimo & EmprestimoRelations;
