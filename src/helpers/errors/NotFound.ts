import { NOT_FOUND, getStatusText } from 'http-status-codes';

export class NotFound extends Error {
  public statusCode: number;
  constructor(message: string) {
    super(message);

    this.name = getStatusText(NOT_FOUND);
    this.statusCode = NOT_FOUND;
  }
}
