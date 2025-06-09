import _ from 'lodash'
import APIConfig from '@/configs/APIConfig'
import CoreAPIRequest from '../CoreAPIRequest'
import { HTTPMethod } from '@/common/enum/http-method'

class GetProfileAPIRequest extends CoreAPIRequest {
  method: HTTPMethod = HTTPMethod.GET
  url: string = `${APIConfig.coreAPI}/users/profile`

  constructor() {
    super()
  }

  makeQuery() {
    return {}
  }

  makeBody() {
    return {}
  }
}

export default GetProfileAPIRequest
