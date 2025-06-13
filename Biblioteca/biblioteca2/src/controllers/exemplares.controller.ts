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
import {Exemplares} from '../models';
import {ExemplaresRepository} from '../repositories';

export class ExemplaresController {
  constructor(
    @repository(ExemplaresRepository)
    public exemplaresRepository : ExemplaresRepository,
  ) {}

  @post('/exemplares')
  @response(200, {
    description: 'Exemplares model instance',
    content: {'application/json': {schema: getModelSchemaRef(Exemplares)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Exemplares, {
            title: 'NewExemplares',
            exclude: ['numeroDeCopia'],
          }),
        },
      },
    })
    exemplares: Omit<Exemplares, 'numeroDeCopia'>,
  ): Promise<Exemplares> {
    return this.exemplaresRepository.create(exemplares);
  }

  @get('/exemplares/count')
  @response(200, {
    description: 'Exemplares model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Exemplares) where?: Where<Exemplares>,
  ): Promise<Count> {
    return this.exemplaresRepository.count(where);
  }

  @get('/exemplares')
  @response(200, {
    description: 'Array of Exemplares model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Exemplares, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Exemplares) filter?: Filter<Exemplares>,
  ): Promise<Exemplares[]> {
    return this.exemplaresRepository.find(filter);
  }

  @patch('/exemplares')
  @response(200, {
    description: 'Exemplares PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Exemplares, {partial: true}),
        },
      },
    })
    exemplares: Exemplares,
    @param.where(Exemplares) where?: Where<Exemplares>,
  ): Promise<Count> {
    return this.exemplaresRepository.updateAll(exemplares, where);
  }

  @get('/exemplares/{id}')
  @response(200, {
    description: 'Exemplares model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Exemplares, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Exemplares, {exclude: 'where'}) filter?: FilterExcludingWhere<Exemplares>
  ): Promise<Exemplares> {
    return this.exemplaresRepository.findById(id, filter);
  }

  @patch('/exemplares/{id}')
  @response(204, {
    description: 'Exemplares PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Exemplares, {partial: true}),
        },
      },
    })
    exemplares: Exemplares,
  ): Promise<void> {
    await this.exemplaresRepository.updateById(id, exemplares);
  }

  @put('/exemplares/{id}')
  @response(204, {
    description: 'Exemplares PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() exemplares: Exemplares,
  ): Promise<void> {
    await this.exemplaresRepository.replaceById(id, exemplares);
  }

  @del('/exemplares/{id}')
  @response(204, {
    description: 'Exemplares DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.exemplaresRepository.deleteById(id);
  }
}
