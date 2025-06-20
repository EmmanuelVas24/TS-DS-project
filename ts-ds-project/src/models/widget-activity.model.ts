import {Entity, model, property} from '@loopback/repository';

@model()
export class WidgetActivity extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'number',
  })
  hovers?: number;

  @property({
    type: 'number',
  })
  clicks?: number;

  @property({
    type: 'date',
  })
  time?: string;


  constructor(data?: Partial<WidgetActivity>) {
    super(data);
  }
}

export interface WidgetActivityRelations {
  // describe navigational properties here
}

export type WidgetActivityWithRelations = WidgetActivity & WidgetActivityRelations;
