import APIRequest from '@/common/interface/api-request'
import APIResponse from '@/common/models/api-response'
import Axios, { AxiosRequestConfig } from 'axios'
import { deleteCookie } from 'cookies-next'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import { fetchWithNext } from './fetch-api-next'
import { StatusCode } from '@/common/enum/status-code'
import { TOKEN_COOKIE } from '@/common/constants'
import { navigateToUrl } from '@/common/utilities/navigation'
import { ROUTES } from '@/common/utilities/routes'
import { showErrorToast } from '@/common/utilities/toast'

export function fetch(apiRequest: APIRequest, option?: { disabledError?: boolean }): Promise<APIResponse> {
  if (apiRequest.fetcherType === 'NEXT_FETCH') return fetchWithNext(apiRequest)
  const options = createAxiosOptions(apiRequest)
  const startTime = new Date().valueOf()
  return new Promise((resolve, reject) => {
    Axios(options)
      .then(response => {
        const responseModel = new APIResponse(response.data, response.status == StatusCode.SUCCESS)
        resolve(responseModel)
      })
      .catch(async err => {
        if (Axios.isCancel(err)) {
          console.log('REQUEST Cancelled', options)
        }
        try {
          const statusCode = get(err, 'response.status')
          const message = get(err, 'response.data.message')
          if (statusCode === 401) {
            deleteCookie(TOKEN_COOKIE)
            navigateToUrl(ROUTES.LOGIN())
          }
          if (statusCode === 403) {
            deleteCookie(TOKEN_COOKIE)
            navigateToUrl(ROUTES.LOGIN())
          }
          if (!option?.disabledError) showErrorToast(message)
          // if ((statusCode === 403 || statusCode === 401) && !!apiRequest.refreshToken) {
          //   await apiRequest.refreshToken()
          //   return resolve(fetch(apiRequest))
          // }
        } catch (error) {}
        if (err.response) {
          reject(new APIResponse(err.response.data, false))
        } else {
          reject(new APIResponse(err, false))
        }
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

function createAxiosOptions(apiRequest: APIRequest): AxiosRequestConfig {
  const body = apiRequest.makeBody()
  const isFormData = body instanceof FormData
  return {
    baseURL: apiRequest.baseUrl ? apiRequest.baseUrl : '',
    url: apiRequest.url,
    timeout: 60000,
    headers: {
      ...(!!apiRequest.makeHeader ? apiRequest.makeHeader() : {})
    },
    // cancelToken: new CancelToken(c => cancelTokens.push(c)),
    method: apiRequest.method,
    data: isFormData ? body : !isEmpty(body) ? body : undefined,
    params: {
      ...(apiRequest.makeQuery() || {})
    }
  }
}

export default { fetch }
