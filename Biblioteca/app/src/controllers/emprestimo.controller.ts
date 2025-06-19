import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Emprestimo} from '../models';
import {EmprestimoRepository} from '../repositories';

export class EmprestimoController {
  constructor(
    @repository(EmprestimoRepository)
    public emprestimoRepository : EmprestimoRepository,
  ) {}

  @post('/emprestimos')
  @response(200, {
    description: 'Emprestimo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Emprestimo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Emprestimo, {
            title: 'NewEmprestimo',
            exclude: ['codigoEmprestimo'],
          }),
        },
      },
    })
    emprestimo: Omit<Emprestimo, 'codigoEmprestimo'>,
  ): Promise<Emprestimo> {
    return this.emprestimoRepository.create(emprestimo);
  }

  @get('/emprestimos/count')
  @response(200, {
    description: 'Emprestimo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Emprestimo) where?: Where<Emprestimo>,
  ): Promise<Count> {
    return this.emprestimoRepository.count(where);
  }

  @get('/emprestimos')
  @response(200, {
    description: 'Array of Emprestimo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Emprestimo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Emprestimo) filter?: Filter<Emprestimo>,
  ): Promise<Emprestimo[]> {
    return this.emprestimoRepository.find(filter);
  }

  @patch('/emprestimos')
  @response(200, {
    description: 'Emprestimo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Emprestimo, {partial: true}),
        },
      },
    })
    emprestimo: Emprestimo,
    @param.where(Emprestimo) where?: Where<Emprestimo>,
  ): Promise<Count> {
    return this.emprestimoRepository.updateAll(emprestimo, where);
  }

  @get('/emprestimos/{id}')
  @response(200, {
    description: 'Emprestimo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Emprestimo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Emprestimo, {exclude: 'where'}) filter?: FilterExcludingWhere<Emprestimo>
  ): Promise<Emprestimo> {
    return this.emprestimoRepository.findById(id, filter);
  }

  @patch('/emprestimos/{id}')
  @response(204, {
    description: 'Emprestimo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Emprestimo, {partial: true}),
        },
      },
    })
    emprestimo: Emprestimo,
  ): Promise<void> {
    await this.emprestimoRepository.updateById(id, emprestimo);
  }

  @put('/emprestimos/{id}')
  @response(204, {
    description: 'Emprestimo PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() emprestimo: Emprestimo,
  ): Promise<void> {
    await this.emprestimoRepository.replaceById(id, emprestimo);
  }

  @del('/emprestimos/{id}')
  @response(204, {
    description: 'Emprestimo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.emprestimoRepository.deleteById(id);
  }
}
