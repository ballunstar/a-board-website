import _ from 'lodash'
import APIConfig from '@/configs/APIConfig'
import CoreAPIRequest from '../CoreAPIRequest'
import { HTTPMethod } from '@/common/enum/http-method'
import QueryOption from '@/common/models/query-option'

class GetPostsAPIRequest extends CoreAPIRequest {
  method: HTTPMethod = HTTPMethod.GET
  url: string = `${APIConfig.coreAPI}/posts`

  constructor(private query: QueryOption) {
    super()
    this.query = query
  }

  makeQuery() {
    return this.query
  }

  makeBody() {
    return {}
  }
}

export default GetPostsAPIRequest
