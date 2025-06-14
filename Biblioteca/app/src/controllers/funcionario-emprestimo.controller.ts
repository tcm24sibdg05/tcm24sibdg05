import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Funcionario,
  Emprestimo,
} from '../models';
import {FuncionarioRepository} from '../repositories';

export class FuncionarioEmprestimoController {
  constructor(
    @repository(FuncionarioRepository) protected funcionarioRepository: FuncionarioRepository,
  ) { }

  @get('/funcionarios/{id}/emprestimos', {
    responses: {
      '200': {
        description: 'Array of Funcionario has many Emprestimo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Emprestimo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Emprestimo>,
  ): Promise<Emprestimo[]> {
    return this.funcionarioRepository.emprestimos(id).find(filter);
  }

  @post('/funcionarios/{id}/emprestimos', {
    responses: {
      '200': {
        description: 'Funcionario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Emprestimo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Funcionario.prototype.codigoInterno,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Emprestimo, {
            title: 'NewEmprestimoInFuncionario',
            exclude: ['codigoEmprestimo', 'funcionario_emprestimo_fk']
          }),
        },
      },
    }) emprestimo: Omit<Emprestimo, 'codigoEmprestimo'>,
  ): Promise<Emprestimo> {
    return this.funcionarioRepository.emprestimos(id).create(emprestimo);
  }

  @patch('/funcionarios/{id}/emprestimos', {
    responses: {
      '200': {
        description: 'Funcionario.Emprestimo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Emprestimo, {partial: true}),
        },
      },
    })
    emprestimo: Partial<Emprestimo>,
    @param.query.object('where', getWhereSchemaFor(Emprestimo)) where?: Where<Emprestimo>,
  ): Promise<Count> {
    return this.funcionarioRepository.emprestimos(id).patch(emprestimo, where);
  }

  @del('/funcionarios/{id}/emprestimos', {
    responses: {
      '200': {
        description: 'Funcionario.Emprestimo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Emprestimo)) where?: Where<Emprestimo>,
  ): Promise<Count> {
    return this.funcionarioRepository.emprestimos(id).delete(where);
  }
}
