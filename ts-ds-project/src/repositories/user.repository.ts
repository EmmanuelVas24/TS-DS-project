import {DefaultCrudRepository} from '@loopback/repository';
import {User, UserRelations} from '../models/user.model';
import {inject} from '@loopback/core';
import {MongodbDataSource} from '../datasources/mongodb.datasource';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(User, dataSource);
  }
}
