import _ from 'lodash'
import APIConfig from '@/configs/APIConfig'
import CoreAPIRequest from '../CoreAPIRequest'
import { HTTPMethod } from '@/common/enum/http-method'

class CreateCommentAPIRequest extends CoreAPIRequest {
  method: HTTPMethod = HTTPMethod.POST
  url: string = `${APIConfig.coreAPI}/posts/:postId/comments`

  constructor(
    postId: string,
    private readonly body: CreateCommentAPIRequestBody
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

export default CreateCommentAPIRequest

export interface CreateCommentAPIRequestBody {
  content: string
}
