import { HTTPMethod } from '@/common/enum/http-method'

export type APIRequestFetchOptions = {
  useInternal?: boolean
}

interface APIRequest {
  baseUrl?: string
  method: HTTPMethod
  url: string
  makeQuery: () => any
  makeBody: () => any
  makeHeader?: () => any
  refreshToken?: () => void
  withoutTimestamp?: boolean
  cacheRevalidateDuration?: number
  fetcherType?: 'NEXT_FETCH' | 'AXIOS'
}

export default APIRequest
