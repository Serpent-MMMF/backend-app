import { HttpStatusCodeValue } from "../constant";

export class HttpError {
  public readonly error: Error;
  public readonly status: HttpStatusCodeValue;

  constructor(params: { error: Error; status: HttpStatusCodeValue }) {
    this.error = params.error;
    this.status = params.status;
  }
}
