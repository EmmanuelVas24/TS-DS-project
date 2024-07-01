import {Entity, model, property} from '@loopback/repository';

@model()
export class Activity extends Entity {
  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;


  constructor(data?: Partial<Activity>) {
    super(data);
  }
}

export interface ActivityRelations {
  // describe navigational properties here
}

export type ActivityWithRelations = Activity & ActivityRelations;
