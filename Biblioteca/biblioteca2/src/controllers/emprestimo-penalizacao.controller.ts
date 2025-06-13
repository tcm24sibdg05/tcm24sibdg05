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
  Emprestimo,
  Penalizacao,
} from '../models';
import {EmprestimoRepository} from '../repositories';

export class EmprestimoPenalizacaoController {
  constructor(
    @repository(EmprestimoRepository) protected emprestimoRepository: EmprestimoRepository,
  ) { }

  @get('/emprestimos/{id}/penalizacaos', {
    responses: {
      '200': {
        description: 'Array of Emprestimo has many Penalizacao',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Penalizacao)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Penalizacao>,
  ): Promise<Penalizacao[]> {
    return this.emprestimoRepository.geraPenalizacao(id).find(filter);
  }

  @post('/emprestimos/{id}/penalizacaos', {
    responses: {
      '200': {
        description: 'Emprestimo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Penalizacao)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Emprestimo.prototype.codigo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Penalizacao, {
            title: 'NewPenalizacaoInEmprestimo',
            exclude: ['codigoDePenalizacao'],
            optional: ['codigoEmprestimo']
          }),
        },
      },
    }) penalizacao: Omit<Penalizacao, 'codigoDePenalizacao'>,
  ): Promise<Penalizacao> {
    return this.emprestimoRepository.geraPenalizacao(id).create(penalizacao);
  }

  @patch('/emprestimos/{id}/penalizacaos', {
    responses: {
      '200': {
        description: 'Emprestimo.Penalizacao PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Penalizacao, {partial: true}),
        },
      },
    })
    penalizacao: Partial<Penalizacao>,
    @param.query.object('where', getWhereSchemaFor(Penalizacao)) where?: Where<Penalizacao>,
  ): Promise<Count> {
    return this.emprestimoRepository.geraPenalizacao(id).patch(penalizacao, where);
  }

  @del('/emprestimos/{id}/penalizacaos', {
    responses: {
      '200': {
        description: 'Emprestimo.Penalizacao DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Penalizacao)) where?: Where<Penalizacao>,
  ): Promise<Count> {
    return this.emprestimoRepository.geraPenalizacao(id).delete(where);
  }
}
