import {Entity, model, property} from '@loopback/repository';

@model()
export class Subreddit extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    unique: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'date',
    required: true,
  })
  createdAt: string;

  @property({
    type: 'string',
    required: true,
  })
  createdBy: string;

  @property({
    type: 'boolean',
    default: false,
  })
  isPrivate?: boolean;

  @property({
    type: 'array',
    itemType: 'string',
    default: [],
  })
  members?: string[];

  @property({
    type: 'number',
    default: 0,
  })
  postCount?: number;

  @property({
    type: 'number',
    default: 0,
  })
  subscriberCount?: number;

  @property({
    type: 'array',
    itemType: 'string',
    default: [],
  })
  tags?: string[];

  constructor(data?: Partial<Subreddit>) {
    super(data);
  }
}

export interface SubredditRelations {
  // describe navigational properties here
}

export type SubredditWithRelations = Subreddit & SubredditRelations;
