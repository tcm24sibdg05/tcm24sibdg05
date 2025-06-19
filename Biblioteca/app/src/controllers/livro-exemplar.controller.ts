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
  Exemplar,
} from '../models';
import {LivroRepository} from '../repositories';

export class LivroExemplarController {
  constructor(
    @repository(LivroRepository) protected livroRepository: LivroRepository,
  ) { }

  @get('/livros/{id}/exemplars', {
    responses: {
      '200': {
        description: 'Array of Livro has many Exemplar',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Exemplar)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Exemplar>,
  ): Promise<Exemplar[]> {
    return this.livroRepository.exemplares(id).find(filter);
  }

  @post('/livros/{id}/exemplars', {
    responses: {
      '200': {
        description: 'Livro model instance',
        content: {'application/json': {schema: getModelSchemaRef(Exemplar)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Livro.prototype.codigoISBN,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Exemplar, {
            title: 'NewExemplarInLivro',
            exclude: ['codigoISBN']
          }),
        },
      },
    }) exemplar: Omit<Exemplar, 'numeroDeCopia'>,
  ): Promise<Exemplar> {
    return this.livroRepository.exemplares(id).create(exemplar);
  }

  @patch('/livros/{id}/exemplars', {
    responses: {
      '200': {
        description: 'Livro.Exemplar PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Exemplar, {partial: true}),
        },
      },
    })
    exemplar: Partial<Exemplar>,
    @param.query.object('where', getWhereSchemaFor(Exemplar)) where?: Where<Exemplar>,
  ): Promise<Count> {
    return this.livroRepository.exemplares(id).patch(exemplar, where);
  }

  @del('/livros/{id}/exemplars', {
    responses: {
      '200': {
        description: 'Livro.Exemplar DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Exemplar)) where?: Where<Exemplar>,
  ): Promise<Count> {
    return this.livroRepository.exemplares(id).delete(where);
  }
}
