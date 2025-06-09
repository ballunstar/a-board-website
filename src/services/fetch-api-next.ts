import { HTTPMethod } from '@/common/enum/http-method'
import APIRequest from '@/common/interface/api-request'
import APIResponse from '@/common/models/api-response'

export function fetchWithNext(
  apiRequest: APIRequest,
  nextOption?: NextFetchRequestConfig,
  requestOptions?: RequestInit
): Promise<APIResponse> {
  const options: RequestInit = {
    method: apiRequest.method,
    headers: {
      ...(!!apiRequest.makeHeader ? apiRequest.makeHeader() : {}),
      'Content-Type': 'application/json'
    },
    body: apiRequest.method === HTTPMethod.POST ? JSON.stringify(apiRequest.makeBody()) : undefined,
    next: { revalidate: 60 * 2, tags: ['next-fetch'], ...nextOption },
    ...requestOptions
  }
  const url = setParams(apiRequest.url, apiRequest.makeQuery())
  const startTime = new Date().valueOf()
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        const responseModel = new APIResponse(data, true)
        resolve(responseModel)
      })
      .catch(err => {
        reject(new APIResponse(err, false))
      })
      .finally(() => {
        const isServer = typeof window === 'undefined'
        if (!isServer) return
        console.log(`API Response Time: ${apiRequest.url}`)
        console.log(`API Response Time: ${new Date().valueOf() - startTime} ms`)
        console.log('-----')
      })
  })
}
function setParams(url: string, params: Record<string, string>) {
  const searchParams = new URLSearchParams(params)
  if (!searchParams.toString()) {
    return url
  }
  return `${url}?${searchParams.toString()}`
}

export default { fetchWithNext }
