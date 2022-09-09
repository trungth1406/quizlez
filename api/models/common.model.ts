export interface CommonDataModel {
    id?: number;
    name: string;
    code: string | null;
}

export interface ApiResponse<T> {
    message: ResponseMessage;
    data: T;
}

export enum ResponseStatus {
    SUCCESS = 'SUCCESS',
    FAIL = 'FAIL',
}

export interface ResponseMessage{
  status: ResponseStatus;
  description?: string;
}
