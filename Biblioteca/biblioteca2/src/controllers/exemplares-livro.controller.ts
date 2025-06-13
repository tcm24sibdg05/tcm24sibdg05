import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Exemplares,
  Livro,
} from '../models';
import {ExemplaresRepository} from '../repositories';

export class ExemplaresLivroController {
  constructor(
    @repository(ExemplaresRepository)
    public exemplaresRepository: ExemplaresRepository,
  ) { }

  @get('/exemplares/{id}/livro', {
    responses: {
      '200': {
        description: 'Livro belonging to Exemplares',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Livro),
          },
        },
      },
    },
  })
  async getLivro(
    @param.path.number('id') id: typeof Exemplares.prototype.numeroDeCopia,
  ): Promise<Livro> {
    return this.exemplaresRepository.existe(id);
  }
}
