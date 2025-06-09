import _ from 'lodash'
import APIConfig from '@/configs/APIConfig'
import CoreAPIRequest from '../CoreAPIRequest'
import { HTTPMethod } from '@/common/enum/http-method'

class SignInAPIRequest extends CoreAPIRequest {
  method: HTTPMethod = HTTPMethod.POST
  url: string = `${APIConfig.coreAPI}/auth/login`

  constructor(private body: SignInAPIRequestBody) {
    super()
  }

  makeQuery() {}

  makeBody() {
    return {
      ...this.body
    }
  }
}

export interface SignInAPIRequestBody {
  email: string
}

export default SignInAPIRequest
