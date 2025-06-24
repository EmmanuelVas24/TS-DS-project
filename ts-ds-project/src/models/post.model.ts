import {Entity, model, property} from '@loopback/repository';

@model()
export class Post extends Entity {
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
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  body: string;

  @property({
    type: 'string',
    required: true,
  })
  authorId: string;

  @property({
    type: 'string',
    required: true,
  })
  subredditId: string;

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
    type: 'number',
    default: 0,
  })
  commentCount?: number;

  @property({
    type: 'string',
  })
  postType?: string;


  @property({
    type: 'array',
    itemType: 'string',
    default: [],
  })
  tags?: string[];

  @property({
    type: 'boolean',
    default: false,
  })
  isEdited?: boolean;

  @property({
    type: 'boolean',
    default: false,
  })
  isDeleted?: boolean;

  constructor(data?: Partial<Post>) {
    super(data);
  }
}

export interface PostRelations {
  // describe navigational properties here
}

export type PostWithRelations = Post & PostRelations;
