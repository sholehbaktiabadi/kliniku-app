export interface Response {
  statusCode: number;
  message: any;
}

export interface ResponsePaginate {
  statusCode: number;
  message: any[];
  total: number;
  totalPage: number;
  isHasNextPage: boolean;
}