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
  Livro,
  Exemplares,
} from '../models';
import {LivroRepository} from '../repositories';

export class LivroExemplaresController {
  constructor(
    @repository(LivroRepository) protected livroRepository: LivroRepository,
  ) { }

  @get('/livros/{id}/exemplares', {
    responses: {
      '200': {
        description: 'Array of Livro has many Exemplares',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Exemplares)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Exemplares>,
  ): Promise<Exemplares[]> {
    return this.livroRepository.possui(id).find(filter);
  }

  @post('/livros/{id}/exemplares', {
    responses: {
      '200': {
        description: 'Livro model instance',
        content: {'application/json': {schema: getModelSchemaRef(Exemplares)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Livro.prototype.codigoISBN,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Exemplares, {
            title: 'NewExemplaresInLivro',
            exclude: ['numeroDeCopia'],
            optional: ['codigoISBN']
          }),
        },
      },
    }) exemplares: Omit<Exemplares, 'numeroDeCopia'>,
  ): Promise<Exemplares> {
    return this.livroRepository.possui(id).create(exemplares);
  }

  @patch('/livros/{id}/exemplares', {
    responses: {
      '200': {
        description: 'Livro.Exemplares PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Exemplares, {partial: true}),
        },
      },
    })
    exemplares: Partial<Exemplares>,
    @param.query.object('where', getWhereSchemaFor(Exemplares)) where?: Where<Exemplares>,
  ): Promise<Count> {
    return this.livroRepository.possui(id).patch(exemplares, where);
  }

  @del('/livros/{id}/exemplares', {
    responses: {
      '200': {
        description: 'Livro.Exemplares DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Exemplares)) where?: Where<Exemplares>,
  ): Promise<Count> {
    return this.livroRepository.possui(id).delete(where);
  }
}
