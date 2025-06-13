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
  Livro,
} from '../models';
import {ReservaRepository} from '../repositories';

export class ReservaLivroController {
  constructor(
    @repository(ReservaRepository)
    public reservaRepository: ReservaRepository,
  ) { }

  @get('/reservas/{id}/livro', {
    responses: {
      '200': {
        description: 'Livro belonging to Reserva',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Livro),
          },
        },
      },
    },
  })
  async getLivro(
    @param.path.number('id') id: typeof Reserva.prototype.codigo,
  ): Promise<Livro> {
    return this.reservaRepository.reserva(id);
  }
}
