import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Reserva,
  Funcionario,
} from '../models';
import {ReservaRepository} from '../repositories';

export class ReservaFuncionarioController {
  constructor(
    @repository(ReservaRepository)
    public reservaRepository: ReservaRepository,
  ) { }

  @get('/reservas/{id}/funcionario', {
    responses: {
      '200': {
        description: 'Funcionario belonging to Reserva',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Funcionario),
          },
        },
      },
    },
  })
  async getFuncionario(
    @param.path.number('id') id: typeof Reserva.prototype.codigo,
  ): Promise<Funcionario> {
    return this.reservaRepository.funcionario(id);
  }
}
