import { Unprocessed } from './Unprocessed';

type objectArray = [{ [key: string]: any }];

export class ValidationError extends Unprocessed {
  private fields: objectArray;
  constructor(data: any) {
    super('Request validation failed');
    this.fields = data;
  }
}
