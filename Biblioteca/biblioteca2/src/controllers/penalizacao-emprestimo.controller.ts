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
  Emprestimo,
} from '../models';
import {PenalizacaoRepository} from '../repositories';

export class PenalizacaoEmprestimoController {
  constructor(
    @repository(PenalizacaoRepository)
    public penalizacaoRepository: PenalizacaoRepository,
  ) { }

  @get('/penalizacaos/{id}/emprestimo', {
    responses: {
      '200': {
        description: 'Emprestimo belonging to Penalizacao',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Emprestimo),
          },
        },
      },
    },
  })
  async getEmprestimo(
    @param.path.number('id') id: typeof Penalizacao.prototype.codigoDePenalizacao,
  ): Promise<Emprestimo> {
    return this.penalizacaoRepository.emprestimo(id);
  }
}
