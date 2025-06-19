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
import {Localizacao} from '../models';
import {LocalizacaoRepository} from '../repositories';

export class LocalizacaoController {
  constructor(
    @repository(LocalizacaoRepository)
    public localizacaoRepository : LocalizacaoRepository,
  ) {}

  @post('/localizacaos')
  @response(200, {
    description: 'Localizacao model instance',
    content: {'application/json': {schema: getModelSchemaRef(Localizacao)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Localizacao, {
            title: 'NewLocalizacao'
          }),
        },
      },
    })
    localizacao: Omit<Localizacao, 'codigoISBN'>,
  ): Promise<Localizacao> {
    return this.localizacaoRepository.create(localizacao);
  }

  @get('/localizacaos/count')
  @response(200, {
    description: 'Localizacao model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Localizacao) where?: Where<Localizacao>,
  ): Promise<Count> {
    return this.localizacaoRepository.count(where);
  }

  @get('/localizacaos')
  @response(200, {
    description: 'Array of Localizacao model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Localizacao, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Localizacao) filter?: Filter<Localizacao>,
  ): Promise<Localizacao[]> {
    return this.localizacaoRepository.find(filter);
  }

  @patch('/localizacaos')
  @response(200, {
    description: 'Localizacao PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Localizacao, {partial: true}),
        },
      },
    })
    localizacao: Localizacao,
    @param.where(Localizacao) where?: Where<Localizacao>,
  ): Promise<Count> {
    return this.localizacaoRepository.updateAll(localizacao, where);
  }

  @get('/localizacaos/{id}')
  @response(200, {
    description: 'Localizacao model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Localizacao, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Localizacao, {exclude: 'where'}) filter?: FilterExcludingWhere<Localizacao>
  ): Promise<Localizacao> {
    return this.localizacaoRepository.findById(id, filter);
  }

  @patch('/localizacaos/{id}')
  @response(204, {
    description: 'Localizacao PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Localizacao, {partial: true}),
        },
      },
    })
    localizacao: Localizacao,
  ): Promise<void> {
    await this.localizacaoRepository.updateById(id, localizacao);
  }

  @put('/localizacaos/{id}')
  @response(204, {
    description: 'Localizacao PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() localizacao: Localizacao,
  ): Promise<void> {
    await this.localizacaoRepository.replaceById(id, localizacao);
  }

  @del('/localizacaos/{id}')
  @response(204, {
    description: 'Localizacao DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.localizacaoRepository.deleteById(id);
  }
}
