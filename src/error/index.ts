import { HttpStatusCodeValue } from "../constant";

export class HttpError {
  public readonly error: Error;
  public readonly status: HttpStatusCodeValue;

  constructor(status: HttpStatusCodeValue, error: Error) {
    this.error = error;
    this.status = status;
  }
}
