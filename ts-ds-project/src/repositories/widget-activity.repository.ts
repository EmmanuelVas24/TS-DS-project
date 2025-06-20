import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {WidgetActivity, WidgetActivityRelations} from '../models';

export class WidgetActivityRepository extends DefaultCrudRepository<
  WidgetActivity,
  typeof WidgetActivity.prototype.id,
  WidgetActivityRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(WidgetActivity, dataSource);
  }
}
