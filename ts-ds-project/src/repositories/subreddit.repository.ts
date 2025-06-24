import {DefaultCrudRepository} from '@loopback/repository';
import {Subreddit, SubredditRelations} from '../models/subreddit.model';
import {inject} from '@loopback/core';
import {MongodbDataSource} from '../datasources/mongodb.datasource';

export class SubredditRepository extends DefaultCrudRepository<
  Subreddit,
  typeof Subreddit.prototype.id,
  SubredditRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Subreddit, dataSource);
  }
}
