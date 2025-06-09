import _ from 'lodash'
import APIConfig from '@/configs/APIConfig'
import CoreAPIRequest from '../CoreAPIRequest'
import { HTTPMethod } from '@/common/enum/http-method'
import { PostAPIRequestBody } from './CreatePostAPIRequest'

class EditPostAPIRequest extends CoreAPIRequest {
  method: HTTPMethod = HTTPMethod.PUT
  url: string = `${APIConfig.coreAPI}/posts/:postId`

  constructor(
    postId: string,
    private readonly body: PostAPIRequestBody
  ) {
    super()
    this.url = this.url.replace(':postId', postId)
  }

  makeQuery() {
    return {}
  }

  makeBody() {
    return {
      ...this.body
    }
  }
}

export default EditPostAPIRequest
