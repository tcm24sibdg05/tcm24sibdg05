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
  Utilizador,
} from '../models';
import {ReservaRepository} from '../repositories';

export class ReservaUtilizadorController {
  constructor(
    @repository(ReservaRepository)
    public reservaRepository: ReservaRepository,
  ) { }

  @get('/reservas/{id}/utilizador', {
    responses: {
      '200': {
        description: 'Utilizador belonging to Reserva',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Utilizador),
          },
        },
      },
    },
  })
  async getUtilizador(
    @param.path.number('id') id: typeof Reserva.prototype.codigo,
  ): Promise<Utilizador> {
    return this.reservaRepository.utilizador(id);
  }
}
