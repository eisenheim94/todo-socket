export interface IDefaultResponse {
  success: boolean;
}

export interface IErrorResponse extends IDefaultResponse {
  error: string;
}
