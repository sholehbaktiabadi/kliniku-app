export interface ApiRequest {
  uri: string;
  method?: string;
  token?: string;
  body?: object;
}