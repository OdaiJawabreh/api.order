export class SuccessResponse implements ResponseApi {
  readonly error_code: number = 0;
  readonly error_message: string = 'success';
  data: any = null;
}
