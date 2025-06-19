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
  Reserva,
} from '../models';
import {LivroRepository} from '../repositories';

export class LivroReservaController {
  constructor(
    @repository(LivroRepository) protected livroRepository: LivroRepository,
  ) { }

  @get('/livros/{id}/reservas', {
    responses: {
      '200': {
        description: 'Array of Livro has many Reserva',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Reserva)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Reserva>,
  ): Promise<Reserva[]> {
    return this.livroRepository.reservas(id).find(filter);
  }

  @post('/livros/{id}/reservas', {
    responses: {
      '200': {
        description: 'Livro model instance',
        content: {'application/json': {schema: getModelSchemaRef(Reserva)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Livro.prototype.codigoISBN,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reserva, {
            title: 'NewReservaInLivro',
            exclude: ['codigo', 'codigoISBN']
          }),
        },
      },
    }) reserva: Omit<Reserva, 'codigo'>,
  ): Promise<Reserva> {
    return this.livroRepository.reservas(id).create(reserva);
  }

  @patch('/livros/{id}/reservas', {
    responses: {
      '200': {
        description: 'Livro.Reserva PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reserva, {partial: true}),
        },
      },
    })
    reserva: Partial<Reserva>,
    @param.query.object('where', getWhereSchemaFor(Reserva)) where?: Where<Reserva>,
  ): Promise<Count> {
    return this.livroRepository.reservas(id).patch(reserva, where);
  }

  @del('/livros/{id}/reservas', {
    responses: {
      '200': {
        description: 'Livro.Reserva DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Reserva)) where?: Where<Reserva>,
  ): Promise<Count> {
    return this.livroRepository.reservas(id).delete(where);
  }
}
