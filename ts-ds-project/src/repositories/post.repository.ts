import {DefaultCrudRepository} from '@loopback/repository';
import {Post, PostRelations} from '../models/post.model';
import {inject} from '@loopback/core';
import {MongodbDataSource} from '../datasources/mongodb.datasource';

export class PostRepository extends DefaultCrudRepository<
  Post,
  typeof Post.prototype.id,
  PostRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Post, dataSource);
  }
}
