import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mogomodel, MogomodelRelations} from '../models';

export class MogomodelRepository extends DefaultCrudRepository<
  Mogomodel,
  typeof Mogomodel.prototype.id,
  MogomodelRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Mogomodel, dataSource);
  }
}
