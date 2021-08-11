type RequestKeys = 'param' | 'query' | 'body'

export interface BaseRequest<Param, Query, Body> {
  param: Param
  query: Query
  body: Body
}

export type CreateRequestType<P, Q, B, K extends RequestKeys> = Pick<BaseRequest<P, Q, B>, K>

export type ExtractPropertyType<T, P extends keyof T> = T[P]
