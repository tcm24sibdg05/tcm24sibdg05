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
  Utilizador,
  Reserva,
} from '../models';
import {UtilizadorRepository} from '../repositories';

export class UtilizadorReservaController {
  constructor(
    @repository(UtilizadorRepository) protected utilizadorRepository: UtilizadorRepository,
  ) { }

  @get('/utilizadors/{id}/reservas', {
    responses: {
      '200': {
        description: 'Array of Utilizador has many Reserva',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Reserva)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Reserva>,
  ): Promise<Reserva[]> {
    return this.utilizadorRepository.efetuaReserva(id).find(filter);
  }

  @post('/utilizadors/{id}/reservas', {
    responses: {
      '200': {
        description: 'Utilizador model instance',
        content: {'application/json': {schema: getModelSchemaRef(Reserva)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Utilizador.prototype.numeroDeUtilizador,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reserva, {
            title: 'NewReservaInUtilizador',
            exclude: ['codigo'],
            optional: ['numeroDeUtilizador']
          }),
        },
      },
    }) reserva: Omit<Reserva, 'codigo'>,
  ): Promise<Reserva> {
    return this.utilizadorRepository.efetuaReserva(id).create(reserva);
  }

  @patch('/utilizadors/{id}/reservas', {
    responses: {
      '200': {
        description: 'Utilizador.Reserva PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
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
    return this.utilizadorRepository.efetuaReserva(id).patch(reserva, where);
  }

  @del('/utilizadors/{id}/reservas', {
    responses: {
      '200': {
        description: 'Utilizador.Reserva DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Reserva)) where?: Where<Reserva>,
  ): Promise<Count> {
    return this.utilizadorRepository.efetuaReserva(id).delete(where);
  }
}
