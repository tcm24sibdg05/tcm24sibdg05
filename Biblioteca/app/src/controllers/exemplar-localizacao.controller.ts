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
  Exemplar,
  Localizacao,
} from '../models';
import {ExemplarRepository} from '../repositories';

export class ExemplarLocalizacaoController {
  constructor(
    @repository(ExemplarRepository) protected exemplarRepository: ExemplarRepository,
  ) { }

  @get('/exemplars/{id}/localizacaos', {
    responses: {
      '200': {
        description: 'Array of Exemplar has many Localizacao',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Localizacao)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Localizacao>,
  ): Promise<Localizacao[]> {
    return this.exemplarRepository.localizacaos(id).find(filter);
  }

  @post('/exemplars/{id}/localizacaos', {
    responses: {
      '200': {
        description: 'Exemplar model instance',
        content: {'application/json': {schema: getModelSchemaRef(Localizacao)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Exemplar.prototype.numeroDeCopia,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Localizacao, {
            title: 'NewLocalizacaoInExemplar',
            exclude: ['numeroDeCopia']
          }),
        },
      },
    }) localizacao: Omit<Localizacao, 'codigoISBN'>,
  ): Promise<Localizacao> {
    return this.exemplarRepository.localizacaos(id).create(localizacao);
  }

  @patch('/exemplars/{id}/localizacaos', {
    responses: {
      '200': {
        description: 'Exemplar.Localizacao PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Localizacao, {partial: true}),
        },
      },
    })
    localizacao: Partial<Localizacao>,
    @param.query.object('where', getWhereSchemaFor(Localizacao)) where?: Where<Localizacao>,
  ): Promise<Count> {
    return this.exemplarRepository.localizacaos(id).patch(localizacao, where);
  }

  @del('/exemplars/{id}/localizacaos', {
    responses: {
      '200': {
        description: 'Exemplar.Localizacao DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Localizacao)) where?: Where<Localizacao>,
  ): Promise<Count> {
    return this.exemplarRepository.localizacaos(id).delete(where);
  }
}
