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
  Penalizacao,
} from '../models';
import {UtilizadorRepository} from '../repositories';

export class UtilizadorPenalizacaoController {
  constructor(
    @repository(UtilizadorRepository) protected utilizadorRepository: UtilizadorRepository,
  ) { }

  @get('/utilizadors/{id}/penalizacaos', {
    responses: {
      '200': {
        description: 'Array of Utilizador has many Penalizacao',
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
    return this.utilizadorRepository.sofrePenalizacao(id).find(filter);
  }

  @post('/utilizadors/{id}/penalizacaos', {
    responses: {
      '200': {
        description: 'Utilizador model instance',
        content: {'application/json': {schema: getModelSchemaRef(Penalizacao)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Utilizador.prototype.numeroDeUtilizador,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Penalizacao, {
            title: 'NewPenalizacaoInUtilizador',
            exclude: ['codigoDePenalizacao'],
            optional: ['numeroDeUtilizador']
          }),
        },
      },
    }) penalizacao: Omit<Penalizacao, 'codigoDePenalizacao'>,
  ): Promise<Penalizacao> {
    return this.utilizadorRepository.sofrePenalizacao(id).create(penalizacao);
  }

  @patch('/utilizadors/{id}/penalizacaos', {
    responses: {
      '200': {
        description: 'Utilizador.Penalizacao PATCH success count',
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
    return this.utilizadorRepository.sofrePenalizacao(id).patch(penalizacao, where);
  }

  @del('/utilizadors/{id}/penalizacaos', {
    responses: {
      '200': {
        description: 'Utilizador.Penalizacao DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Penalizacao)) where?: Where<Penalizacao>,
  ): Promise<Count> {
    return this.utilizadorRepository.sofrePenalizacao(id).delete(where);
  }
}
