import { TOKEN_COOKIE } from '@/common/constants'
import { HTTPMethod } from '@/common/enum/http-method'
import APIRequest from '@/common/interface/api-request'
import APIConfig from '@/configs/APIConfig'
import { getCookie } from 'cookies-next'

class CoreAPIRequest implements APIRequest {
  method: HTTPMethod
  url: string
  setPrefixToken: string = 'Bearer '
  baseUrl: string = APIConfig.coreAPI || ''
  fetcherType: 'NEXT_FETCH' | 'AXIOS' = 'AXIOS'
  cacheRevalidateDuration: number = 0

  makeQuery() {}

  makeBody() {}

  makeHeader() {
    const token = typeof window === 'undefined' ? this.getSSCookie() : this.getToken()
    return {
      Authorization: token ? `Bearer ${token}` : ''
    }
  }

  private getToken(): string | undefined {
    try {
      return getCookie(TOKEN_COOKIE)
    } catch {
      return undefined
    }
  }

  private getSSCookie(): string | undefined {
    try {
      const { cookies } = require('next/headers')
      const cookieStore = cookies()
      const token = cookieStore.get('token')?.value
      return token
    } catch (error) {}
  }
}

export default CoreAPIRequest
