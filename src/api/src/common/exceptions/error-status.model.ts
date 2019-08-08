export class ErrorStatus extends Error {
  public httpStatusCode: number;
  constructor(message: string, httpStatusCode: number) {
    super(message);
    this.httpStatusCode = httpStatusCode;
  }
}
