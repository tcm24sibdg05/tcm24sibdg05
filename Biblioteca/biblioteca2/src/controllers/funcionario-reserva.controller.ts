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
  Funcionario,
  Reserva,
} from '../models';
import {FuncionarioRepository} from '../repositories';

export class FuncionarioReservaController {
  constructor(
    @repository(FuncionarioRepository) protected funcionarioRepository: FuncionarioRepository,
  ) { }

  @get('/funcionarios/{id}/reservas', {
    responses: {
      '200': {
        description: 'Array of Funcionario has many Reserva',
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
    return this.funcionarioRepository.registaReserva(id).find(filter);
  }

  @post('/funcionarios/{id}/reservas', {
    responses: {
      '200': {
        description: 'Funcionario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Reserva)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Funcionario.prototype.codigoInterno,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reserva, {
            title: 'NewReservaInFuncionario',
            exclude: ['codigo'],
            optional: ['codigoInterno']
          }),
        },
      },
    }) reserva: Omit<Reserva, 'codigo'>,
  ): Promise<Reserva> {
    return this.funcionarioRepository.registaReserva(id).create(reserva);
  }

  @patch('/funcionarios/{id}/reservas', {
    responses: {
      '200': {
        description: 'Funcionario.Reserva PATCH success count',
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
    return this.funcionarioRepository.registaReserva(id).patch(reserva, where);
  }

  @del('/funcionarios/{id}/reservas', {
    responses: {
      '200': {
        description: 'Funcionario.Reserva DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Reserva)) where?: Where<Reserva>,
  ): Promise<Count> {
    return this.funcionarioRepository.registaReserva(id).delete(where);
  }
}
