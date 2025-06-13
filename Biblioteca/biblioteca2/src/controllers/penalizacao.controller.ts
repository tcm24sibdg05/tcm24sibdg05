import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Penalizacao} from '../models';
import {PenalizacaoRepository} from '../repositories';

export class PenalizacaoController {
  constructor(
    @repository(PenalizacaoRepository)
    public penalizacaoRepository : PenalizacaoRepository,
  ) {}

  @post('/penalizacao')
  @response(200, {
    description: 'Penalizacao model instance',
    content: {'application/json': {schema: getModelSchemaRef(Penalizacao)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Penalizacao, {
            title: 'NewPenalizacao',
            exclude: ['codigoDePenalizacao'],
          }),
        },
      },
    })
    penalizacao: Omit<Penalizacao, 'codigoDePenalizacao'>,
  ): Promise<Penalizacao> {
    return this.penalizacaoRepository.create(penalizacao);
  }

  @get('/penalizacao/count')
  @response(200, {
    description: 'Penalizacao model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Penalizacao) where?: Where<Penalizacao>,
  ): Promise<Count> {
    return this.penalizacaoRepository.count(where);
  }

  @get('/penalizacao')
  @response(200, {
    description: 'Array of Penalizacao model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Penalizacao, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Penalizacao) filter?: Filter<Penalizacao>,
  ): Promise<Penalizacao[]> {
    return this.penalizacaoRepository.find(filter);
  }

  @patch('/penalizacao')
  @response(200, {
    description: 'Penalizacao PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Penalizacao, {partial: true}),
        },
      },
    })
    penalizacao: Penalizacao,
    @param.where(Penalizacao) where?: Where<Penalizacao>,
  ): Promise<Count> {
    return this.penalizacaoRepository.updateAll(penalizacao, where);
  }

  @get('/penalizacao/{id}')
  @response(200, {
    description: 'Penalizacao model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Penalizacao, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Penalizacao, {exclude: 'where'}) filter?: FilterExcludingWhere<Penalizacao>
  ): Promise<Penalizacao> {
    return this.penalizacaoRepository.findById(id, filter);
  }

  @patch('/penalizacao/{id}')
  @response(204, {
    description: 'Penalizacao PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Penalizacao, {partial: true}),
        },
      },
    })
    penalizacao: Penalizacao,
  ): Promise<void> {
    await this.penalizacaoRepository.updateById(id, penalizacao);
  }

  @put('/penalizacao/{id}')
  @response(204, {
    description: 'Penalizacao PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() penalizacao: Penalizacao,
  ): Promise<void> {
    await this.penalizacaoRepository.replaceById(id, penalizacao);
  }

  @del('/penalizacao/{id}')
  @response(204, {
    description: 'Penalizacao DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.penalizacaoRepository.deleteById(id);
  }
}
