import { UNPROCESSABLE_ENTITY, getStatusText } from 'http-status-codes';

export class Unprocessed extends Error {
  public statusCode: number;
  constructor(message: any) {
    super(message);

    this.name = getStatusText(UNPROCESSABLE_ENTITY);
    this.statusCode = UNPROCESSABLE_ENTITY;
  }
}
