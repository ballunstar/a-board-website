import _ from 'lodash'
import APIConfig from '@/configs/APIConfig'
import CoreAPIRequest from '../CoreAPIRequest'
import { HTTPMethod } from '@/common/enum/http-method'

class DeletePostAPIRequest extends CoreAPIRequest {
  method: HTTPMethod = HTTPMethod.DELETE
  url: string = `${APIConfig.coreAPI}/posts/:postId`

  constructor(postId: string) {
    super()
    this.url = this.url.replace(':postId', postId)
  }

  makeQuery() {
    return {}
  }

  makeBody() {
    return {}
  }
}

export default DeletePostAPIRequest
