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
import {WidgetActivity} from '../models';
import {WidgetActivityRepository} from '../repositories';

export class WidgetActivityController {
  constructor(
    @repository(WidgetActivityRepository)
    public widgetActivityRepository : WidgetActivityRepository,
  ) {}

  @post('/widget-activities')
  @response(200, {
    description: 'WidgetActivity model instance',
    content: {'application/json': {schema: getModelSchemaRef(WidgetActivity)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WidgetActivity, {
            title: 'NewWidgetActivity',
            
          }),
        },
      },
    })
    widgetActivity: WidgetActivity,
  ): Promise<WidgetActivity> {
    return this.widgetActivityRepository.create(widgetActivity);
  }

  @get('/widget-activities/count')
  @response(200, {
    description: 'WidgetActivity model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(WidgetActivity) where?: Where<WidgetActivity>,
  ): Promise<Count> {
    return this.widgetActivityRepository.count(where);
  }

  @get('/widget-activities')
  @response(200, {
    description: 'Array of WidgetActivity model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(WidgetActivity, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(WidgetActivity) filter?: Filter<WidgetActivity>,
  ): Promise<WidgetActivity[]> {
    return this.widgetActivityRepository.find(filter);
  }

  @patch('/widget-activities')
  @response(200, {
    description: 'WidgetActivity PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WidgetActivity, {partial: true}),
        },
      },
    })
    widgetActivity: WidgetActivity,
    @param.where(WidgetActivity) where?: Where<WidgetActivity>,
  ): Promise<Count> {
    return this.widgetActivityRepository.updateAll(widgetActivity, where);
  }

  @get('/widget-activities/{id}')
  @response(200, {
    description: 'WidgetActivity model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(WidgetActivity, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(WidgetActivity, {exclude: 'where'}) filter?: FilterExcludingWhere<WidgetActivity>
  ): Promise<WidgetActivity> {
    return this.widgetActivityRepository.findById(id, filter);
  }

  @patch('/widget-activities/{id}')
  @response(204, {
    description: 'WidgetActivity PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WidgetActivity, {partial: true}),
        },
      },
    })
    widgetActivity: WidgetActivity,
  ): Promise<void> {
    await this.widgetActivityRepository.updateById(id, widgetActivity);
  }

  @put('/widget-activities/{id}')
  @response(204, {
    description: 'WidgetActivity PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() widgetActivity: WidgetActivity,
  ): Promise<void> {
    await this.widgetActivityRepository.replaceById(id, widgetActivity);
  }

  @del('/widget-activities/{id}')
  @response(204, {
    description: 'WidgetActivity DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.widgetActivityRepository.deleteById(id);
  }
}
