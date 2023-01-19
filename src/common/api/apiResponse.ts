import { Code } from '../code/code';
import { Nullable } from '../types/commonTypes';

export class ApiResponse<TData> {
  public readonly code: number;

  public readonly message: string;

  public readonly timestamp: number;

  public readonly data: Nullable<TData>;

  private constructor(code: number, message: string, data?: TData) {
    this.code = code;
    this.message = message;
    this.data = data || null;
    this.timestamp = Date.now();
  }

  public static created<TData>(
    data?: TData,
    message?: string,
  ): ApiResponse<TData> {
    const resultCode: number = Code.CREATED.code;
    const resultMessage: string = message || Code.CREATED.message;

    return new ApiResponse(resultCode, resultMessage, data);
  }

  public static success<TData>(
    data?: TData,
    message?: string,
  ): ApiResponse<TData> {
    const resultCode: number = Code.SUCCESS.code;
    const resultMessage: string = message || Code.SUCCESS.message;

    return new ApiResponse(resultCode, resultMessage, data);
  }

  public static error<TData>(
    code?: number,
    message?: string,
    data?: TData,
  ): ApiResponse<TData> {
    const resultCode: number = code || Code.INTERNAL_ERROR.code;
    const resultMessage: string = message || Code.INTERNAL_ERROR.message;

    return new ApiResponse(resultCode, resultMessage, data);
  }
}
