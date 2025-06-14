import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Emprestimo,
  Utilizador,
} from '../models';
import {EmprestimoRepository} from '../repositories';

export class EmprestimoUtilizadorController {
  constructor(
    @repository(EmprestimoRepository)
    public emprestimoRepository: EmprestimoRepository,
  ) { }

  @get('/emprestimos/{id}/utilizador', {
    responses: {
      '200': {
        description: 'Utilizador belonging to Emprestimo',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Utilizador),
          },
        },
      },
    },
  })
  async getUtilizador(
    @param.path.number('id') id: typeof Emprestimo.prototype.codigo,
  ): Promise<Utilizador> {
    return this.emprestimoRepository.utilizador(id);
  }
}
