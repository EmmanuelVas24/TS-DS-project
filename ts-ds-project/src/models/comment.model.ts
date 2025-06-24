import {Entity, model, property} from '@loopback/repository';

@model()
export class Comment extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  postId: string;

  @property({
    type: 'string',
  })
  parentCommentId?: string;

  @property({
    type: 'string',
    required: true,
  })
  authorId: string;

  @property({
    type: 'string',
    required: true,
  })
  body: string;

  @property({
    type: 'date',
    required: true,
  })
  createdAt: string;

  @property({
    type: 'date',
  })
  updatedAt?: string;

  @property({
    type: 'number',
    default: 0,
  })
  voteCount?: number;

  @property({
    type: 'boolean',
    default: false,
  })
  isDeleted?: boolean;

  @property({
    type: 'boolean',
    default: false,
  })
  isEdited?: boolean;

  constructor(data?: Partial<Comment>) {
    super(data);
  }
}

export interface CommentRelations {
  // describe navigational properties here
}

export type CommentWithRelations = Comment & CommentRelations;
