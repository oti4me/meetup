import { BAD_REQUEST, getStatusText } from 'http-status-codes';

export class BadRequest extends Error {
  public statusCode: number;
  constructor(message: string) {
    super(message);

    this.name = getStatusText(BAD_REQUEST);
    this.statusCode = BAD_REQUEST;
  }
}
