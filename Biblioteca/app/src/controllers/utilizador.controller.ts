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
import {Utilizador} from '../models';
import {UtilizadorRepository} from '../repositories';

export class UtilizadorController {
  constructor(
    @repository(UtilizadorRepository)
    public utilizadorRepository : UtilizadorRepository,
  ) {}

  @post('/utilizadors')
  @response(200, {
    description: 'Utilizador model instance',
    content: {'application/json': {schema: getModelSchemaRef(Utilizador)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Utilizador, {
            title: 'NewUtilizador',
            exclude: ['numeroDeUtilizador'],
          }),
        },
      },
    })
    utilizador: Omit<Utilizador, 'numeroDeUtilizador'>,
  ): Promise<Utilizador> {
    return this.utilizadorRepository.create(utilizador);
  }

  @get('/utilizadors/count')
  @response(200, {
    description: 'Utilizador model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Utilizador) where?: Where<Utilizador>,
  ): Promise<Count> {
    return this.utilizadorRepository.count(where);
  }

  @get('/utilizadors')
  @response(200, {
    description: 'Array of Utilizador model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Utilizador, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Utilizador) filter?: Filter<Utilizador>,
  ): Promise<Utilizador[]> {
    return this.utilizadorRepository.find(filter);
  }

  @patch('/utilizadors')
  @response(200, {
    description: 'Utilizador PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Utilizador, {partial: true}),
        },
      },
    })
    utilizador: Utilizador,
    @param.where(Utilizador) where?: Where<Utilizador>,
  ): Promise<Count> {
    return this.utilizadorRepository.updateAll(utilizador, where);
  }

  @get('/utilizadors/{id}')
  @response(200, {
    description: 'Utilizador model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Utilizador, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Utilizador, {exclude: 'where'}) filter?: FilterExcludingWhere<Utilizador>
  ): Promise<Utilizador> {
    return this.utilizadorRepository.findById(id, filter);
  }

  @patch('/utilizadors/{id}')
  @response(204, {
    description: 'Utilizador PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Utilizador, {partial: true}),
        },
      },
    })
    utilizador: Utilizador,
  ): Promise<void> {
    await this.utilizadorRepository.updateById(id, utilizador);
  }

  @put('/utilizadors/{id}')
  @response(204, {
    description: 'Utilizador PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() utilizador: Utilizador,
  ): Promise<void> {
    await this.utilizadorRepository.replaceById(id, utilizador);
  }

  @del('/utilizadors/{id}')
  @response(204, {
    description: 'Utilizador DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.utilizadorRepository.deleteById(id);
  }
}
