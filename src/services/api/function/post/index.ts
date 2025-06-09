import Pagination from '@/common/models/pagination'
import Post from '@/common/models/post'
import QueryOption from '@/common/models/query-option'
import GetPostsAPIRequest from '../../request/post/GetPostsAPIRequest'
import { fetch } from '@/services/fetch-api'
import { get } from 'lodash'
import GetOurPostsAPIRequest from '../../request/post/GetOurPostsAPIRequest'
import GetPostDetailAPIRequest from '../../request/post/GetPostDetailAPIRequest'

export function getPosts(query: QueryOption): Promise<{ data: Post[]; pagination: Pagination }> {
  return new Promise(async (resolve, reject) => {
    try {
      const apiRequest = new GetPostsAPIRequest(query)
      const dataJSON = await fetch(apiRequest)
      const data: Post[] = get(dataJSON, 'data.data.data')
      const pagination: Pagination = new Pagination(get(dataJSON, 'data.data.pagination'))

      resolve({
        data,
        pagination: pagination
      })
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}
export function getOurPosts(query: QueryOption): Promise<{ data: Post[]; pagination: Pagination }> {
  return new Promise(async (resolve, reject) => {
    try {
      const apiRequest = new GetOurPostsAPIRequest(query)
      const dataJSON = await fetch(apiRequest)
      const data: Post[] = get(dataJSON, 'data.data.data')
      const pagination: Pagination = new Pagination(get(dataJSON, 'data.data.pagination'))

      resolve({
        data,
        pagination: pagination
      })
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

export function getPostDetail(id: string): Promise<Post> {
  return new Promise(async (resolve, reject) => {
    try {
      const apiRequest = new GetPostDetailAPIRequest(id)
      const dataJSON = await fetch(apiRequest)
      const data: Post = new Post(get(dataJSON, 'data.data'))

      resolve(data)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}
