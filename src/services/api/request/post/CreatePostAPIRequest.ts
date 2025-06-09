import _ from 'lodash'
import APIConfig from '@/configs/APIConfig'
import CoreAPIRequest from '../CoreAPIRequest'
import { HTTPMethod } from '@/common/enum/http-method'

class CreatePostAPIRequest extends CoreAPIRequest {
  method: HTTPMethod = HTTPMethod.POST
  url: string = `${APIConfig.coreAPI}/posts`

  constructor(private readonly body: PostAPIRequestBody) {
    super()
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

export default CreatePostAPIRequest

export interface PostAPIRequestBody {
  content: string
  title: string
  category: string
}
