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
  Emprestimo,
} from '../models';
import {LivroRepository} from '../repositories';

export class LivroEmprestimoController {
  constructor(
    @repository(LivroRepository) protected livroRepository: LivroRepository,
  ) { }

  @get('/livros/{id}/emprestimos', {
    responses: {
      '200': {
        description: 'Array of Livro has many Emprestimo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Emprestimo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Emprestimo>,
  ): Promise<Emprestimo[]> {
    return this.livroRepository.emprestimos(id).find(filter);
  }

  @post('/livros/{id}/emprestimos', {
    responses: {
      '200': {
        description: 'Livro model instance',
        content: {'application/json': {schema: getModelSchemaRef(Emprestimo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Livro.prototype.codigoISBN,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Emprestimo, {
            title: 'NewEmprestimoInLivro',
            exclude: ['codigoEmprestimo', 'codigoISBN']
          }),
        },
      },
    }) emprestimo: Omit<Emprestimo, 'codigoEmprestimo'>,
  ): Promise<Emprestimo> {
    return this.livroRepository.emprestimos(id).create(emprestimo);
  }

  @patch('/livros/{id}/emprestimos', {
    responses: {
      '200': {
        description: 'Livro.Emprestimo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Emprestimo, {partial: true}),
        },
      },
    })
    emprestimo: Partial<Emprestimo>,
    @param.query.object('where', getWhereSchemaFor(Emprestimo)) where?: Where<Emprestimo>,
  ): Promise<Count> {
    return this.livroRepository.emprestimos(id).patch(emprestimo, where);
  }

  @del('/livros/{id}/emprestimos', {
    responses: {
      '200': {
        description: 'Livro.Emprestimo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Emprestimo)) where?: Where<Emprestimo>,
  ): Promise<Count> {
    return this.livroRepository.emprestimos(id).delete(where);
  }
}
