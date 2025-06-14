import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Penalizacao,
  Utilizador,
} from '../models';
import {PenalizacaoRepository} from '../repositories';

export class PenalizacaoUtilizadorController {
  constructor(
    @repository(PenalizacaoRepository)
    public penalizacaoRepository: PenalizacaoRepository,
  ) { }

  @get('/penalizacaos/{id}/utilizador', {
    responses: {
      '200': {
        description: 'Utilizador belonging to Penalizacao',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Utilizador),
          },
        },
      },
    },
  })
  async getUtilizador(
    @param.path.number('id') id: typeof Penalizacao.prototype.codigoDePenalizacao,
  ): Promise<Utilizador> {
    return this.penalizacaoRepository.utilizador(id);
  }
}
