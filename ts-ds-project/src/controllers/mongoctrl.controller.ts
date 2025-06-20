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
import {Mogomodel} from '../models';
import {MogomodelRepository} from '../repositories';

export class MongoctrlController {
  constructor(
    @repository(MogomodelRepository)
    public mogomodelRepository : MogomodelRepository,
  ) {}

  @post('/mogomodels')
  @response(200, {
    description: 'Mogomodel model instance',
    content: {'application/json': {schema: getModelSchemaRef(Mogomodel)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mogomodel, {
            title: 'NewMogomodel',
            
          }),
        },
      },
    })
    mogomodel: Mogomodel,
  ): Promise<Mogomodel> {
    return this.mogomodelRepository.create(mogomodel);
  }

  @get('/mogomodels/count')
  @response(200, {
    description: 'Mogomodel model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Mogomodel) where?: Where<Mogomodel>,
  ): Promise<Count> {
    return this.mogomodelRepository.count(where);
  }

  @get('/mogomodels')
  @response(200, {
    description: 'Array of Mogomodel model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Mogomodel, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Mogomodel) filter?: Filter<Mogomodel>,
  ): Promise<Mogomodel[]> {
    return this.mogomodelRepository.find(filter);
  }

  @patch('/mogomodels')
  @response(200, {
    description: 'Mogomodel PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mogomodel, {partial: true}),
        },
      },
    })
    mogomodel: Mogomodel,
    @param.where(Mogomodel) where?: Where<Mogomodel>,
  ): Promise<Count> {
    return this.mogomodelRepository.updateAll(mogomodel, where);
  }

  @get('/mogomodels/{id}')
  @response(200, {
    description: 'Mogomodel model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Mogomodel, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Mogomodel, {exclude: 'where'}) filter?: FilterExcludingWhere<Mogomodel>
  ): Promise<Mogomodel> {
    return this.mogomodelRepository.findById(id, filter);
  }

  @patch('/mogomodels/{id}')
  @response(204, {
    description: 'Mogomodel PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mogomodel, {partial: true}),
        },
      },
    })
    mogomodel: Mogomodel,
  ): Promise<void> {
    await this.mogomodelRepository.updateById(id, mogomodel);
  }

  @put('/mogomodels/{id}')
  @response(204, {
    description: 'Mogomodel PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() mogomodel: Mogomodel,
  ): Promise<void> {
    await this.mogomodelRepository.replaceById(id, mogomodel);
  }

  @del('/mogomodels/{id}')
  @response(204, {
    description: 'Mogomodel DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.mogomodelRepository.deleteById(id);
  }
}
