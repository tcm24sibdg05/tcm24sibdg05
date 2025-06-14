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
  Utilizador,
  Emprestimo,
} from '../models';
import {UtilizadorRepository} from '../repositories';

export class UtilizadorEmprestimoController {
  constructor(
    @repository(UtilizadorRepository) protected utilizadorRepository: UtilizadorRepository,
  ) { }

  @get('/utilizadors/{id}/emprestimos', {
    responses: {
      '200': {
        description: 'Array of Utilizador has many Emprestimo',
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
    return this.utilizadorRepository.emprestimos(id).find(filter);
  }

  @post('/utilizadors/{id}/emprestimos', {
    responses: {
      '200': {
        description: 'Utilizador model instance',
        content: {'application/json': {schema: getModelSchemaRef(Emprestimo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Utilizador.prototype.numeroDeUtilizador,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Emprestimo, {
            title: 'NewEmprestimoInUtilizador',
            exclude: ['codigoEmprestimo', 'numeroDeUtilizador']
          }),
        },
      },
    }) emprestimo: Omit<Emprestimo, 'codigoEmprestimo'>,
  ): Promise<Emprestimo> {
    return this.utilizadorRepository.emprestimos(id).create(emprestimo);
  }

  @patch('/utilizadors/{id}/emprestimos', {
    responses: {
      '200': {
        description: 'Utilizador.Emprestimo PATCH success count',
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
    return this.utilizadorRepository.emprestimos(id).patch(emprestimo, where);
  }

  @del('/utilizadors/{id}/emprestimos', {
    responses: {
      '200': {
        description: 'Utilizador.Emprestimo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Emprestimo)) where?: Where<Emprestimo>,
  ): Promise<Count> {
    return this.utilizadorRepository.emprestimos(id).delete(where);
  }
}
