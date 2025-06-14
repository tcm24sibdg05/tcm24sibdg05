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
import {Exemplar} from '../models';
import {ExemplarRepository} from '../repositories';

export class ExemplarController {
  constructor(
    @repository(ExemplarRepository)
    public exemplarRepository : ExemplarRepository,
  ) {}

  @post('/exemplars')
  @response(200, {
    description: 'Exemplar model instance',
    content: {'application/json': {schema: getModelSchemaRef(Exemplar)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Exemplar, {
            title: 'NewExemplar'
          }),
        },
      },
    })
    exemplar: Omit<Exemplar, 'numeroDeCopia'>,
  ): Promise<Exemplar> {
    return this.exemplarRepository.create(exemplar);
  }

  @get('/exemplars/count')
  @response(200, {
    description: 'Exemplar model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Exemplar) where?: Where<Exemplar>,
  ): Promise<Count> {
    return this.exemplarRepository.count(where);
  }

  @get('/exemplars')
  @response(200, {
    description: 'Array of Exemplar model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Exemplar, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Exemplar) filter?: Filter<Exemplar>,
  ): Promise<Exemplar[]> {
    return this.exemplarRepository.find(filter);
  }

  @patch('/exemplars')
  @response(200, {
    description: 'Exemplar PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Exemplar, {partial: true}),
        },
      },
    })
    exemplar: Exemplar,
    @param.where(Exemplar) where?: Where<Exemplar>,
  ): Promise<Count> {
    return this.exemplarRepository.updateAll(exemplar, where);
  }

  @get('/exemplars/{id}')
  @response(200, {
    description: 'Exemplar model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Exemplar, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Exemplar, {exclude: 'where'}) filter?: FilterExcludingWhere<Exemplar>
  ): Promise<Exemplar> {
    return this.exemplarRepository.findById(id, filter);
  }

  @patch('/exemplars/{id}')
  @response(204, {
    description: 'Exemplar PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Exemplar, {partial: true}),
        },
      },
    })
    exemplar: Exemplar,
  ): Promise<void> {
    await this.exemplarRepository.updateById(id, exemplar);
  }

  @put('/exemplars/{id}')
  @response(204, {
    description: 'Exemplar PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() exemplar: Exemplar,
  ): Promise<void> {
    await this.exemplarRepository.replaceById(id, exemplar);
  }

  @del('/exemplars/{id}')
  @response(204, {
    description: 'Exemplar DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.exemplarRepository.deleteById(id);
  }
}
