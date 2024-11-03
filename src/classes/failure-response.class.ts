export class FailureResponse implements ResponseApi {
  error_code: number;
  error_message: string;
  readonly data: any = null;
}
