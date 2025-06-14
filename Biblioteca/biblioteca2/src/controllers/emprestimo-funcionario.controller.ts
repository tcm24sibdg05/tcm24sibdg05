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
  Funcionario,
} from '../models';
import {EmprestimoRepository} from '../repositories';

export class EmprestimoFuncionarioController {
  constructor(
    @repository(EmprestimoRepository)
    public emprestimoRepository: EmprestimoRepository,
  ) { }

  @get('/emprestimos/{id}/funcionario', {
    responses: {
      '200': {
        description: 'Funcionario belonging to Emprestimo',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Funcionario),
          },
        },
      },
    },
  })
  async getFuncionario(
    @param.path.number('id') id: typeof Emprestimo.prototype.codigo,
  ): Promise<Funcionario> {
    return this.emprestimoRepository.funcionario(id);
  }
}
