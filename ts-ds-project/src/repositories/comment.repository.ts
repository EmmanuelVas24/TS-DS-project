import {DefaultCrudRepository} from '@loopback/repository';
import {Comment, CommentRelations} from '../models/comment.model';
import {inject} from '@loopback/core';
import {MongodbDataSource} from '../datasources/mongodb.datasource';

export class CommentRepository extends DefaultCrudRepository<
  Comment,
  typeof Comment.prototype.id,
  CommentRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Comment, dataSource);
  }
}
