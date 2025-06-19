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

  @post('/livros')
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
            exclude:['codigoISBN']
          }),
        },
      },
    })
    livro: Omit<Livro, 'codigoISBN'>,
  ): Promise<Livro> {
    return this.livroRepository.create(livro);
  }

  @get('/livros/count')
  @response(200, {
    description: 'Livro model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Livro) where?: Where<Livro>,
  ): Promise<Count> {
    return this.livroRepository.count(where);
  }

  @get('/livros')
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

  @patch('/livros')
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

  @get('/livros/{id}')
  @response(200, {
    description: 'Livro model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Livro, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Livro, {exclude: 'where'}) filter?: FilterExcludingWhere<Livro>
  ): Promise<Livro> {
    return this.livroRepository.findById(id, filter);
  }

  @patch('/livros/{id}')
  @response(204, {
    description: 'Livro PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
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

  @put('/livros/{id}')
  @response(204, {
    description: 'Livro PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() livro: Livro,
  ): Promise<void> {
    await this.livroRepository.replaceById(id, livro);
  }

  @del('/livros/{id}')
  @response(204, {
    description: 'Livro DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.livroRepository.deleteById(id);
  }
}
