import { CONFLICT, getStatusText } from 'http-status-codes';

export class Conflict extends Error {
  public statusCode: number;
  constructor(message: string) {
    super(message);

    this.name = getStatusText(CONFLICT);
    this.statusCode = CONFLICT;
  }
}
