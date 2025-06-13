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
import {Livro} from '../models';
import {LivroRepository} from '../repositories';

export class LivroController {
  constructor(
    @repository(LivroRepository)
    public livroRepository : LivroRepository,
  ) {}

  @post('/livro')
  @response(200, {
    description: 'Livro model instance',
    content: {'application/json': {schema: getModelSchemaRef(Livro)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Livro, {
            title: 'NewLivro',
            exclude: ['codigoISBN'],
          }),
        },
      },
    })
    livro: Omit<Livro, 'codigoISBN'>,
  ): Promise<Livro> {
    return this.livroRepository.create(livro);
  }

  @get('/livro/count')
  @response(200, {
    description: 'Livro model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Livro) where?: Where<Livro>,
  ): Promise<Count> {
    return this.livroRepository.count(where);
  }

  @get('/livro')
  @response(200, {
    description: 'Array of Livro model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Livro, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Livro) filter?: Filter<Livro>,
  ): Promise<Livro[]> {
    return this.livroRepository.find(filter);
  }

  @patch('/livro')
  @response(200, {
    description: 'Livro PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Livro, {partial: true}),
        },
      },
    })
    livro: Livro,
    @param.where(Livro) where?: Where<Livro>,
  ): Promise<Count> {
    return this.livroRepository.updateAll(livro, where);
  }

  @get('/livro/{id}')
  @response(200, {
    description: 'Livro model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Livro, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Livro, {exclude: 'where'}) filter?: FilterExcludingWhere<Livro>
  ): Promise<Livro> {
    return this.livroRepository.findById(id, filter);
  }

  @patch('/livro/{id}')
  @response(204, {
    description: 'Livro PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Livro, {partial: true}),
        },
      },
    })
    livro: Livro,
  ): Promise<void> {
    await this.livroRepository.updateById(id, livro);
  }

  @put('/livro/{id}')
  @response(204, {
    description: 'Livro PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() livro: Livro,
  ): Promise<void> {
    await this.livroRepository.replaceById(id, livro);
  }

  @del('/livro/{id}')
  @response(204, {
    description: 'Livro DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.livroRepository.deleteById(id);
  }
}
