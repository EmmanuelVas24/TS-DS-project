import {Entity, model, property} from '@loopback/repository';

@model()
export class Mogomodel extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;


  constructor(data?: Partial<Mogomodel>) {
    super(data);
  }
}

export interface MogomodelRelations {
  // describe navigational properties here
}

export type MogomodelWithRelations = Mogomodel & MogomodelRelations;
