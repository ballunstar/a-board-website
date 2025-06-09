import CreateCommentAPIRequest, { CreateCommentAPIRequestBody } from './../../request/post/CreateCommentAPIRequest'
import Pagination from '@/common/models/pagination'
import Post from '@/common/models/post'
import QueryOption from '@/common/models/query-option'
import GetPostsAPIRequest from '../../request/post/GetPostsAPIRequest'
import { fetch } from '@/services/fetch-api'
import { get } from 'lodash'
import GetOurPostsAPIRequest from '../../request/post/GetOurPostsAPIRequest'
import GetPostDetailAPIRequest from '../../request/post/GetPostDetailAPIRequest'
import DeletePostAPIRequest from '../../request/post/DeletePostAPIRequest'
import CreatePostAPIRequest, { PostAPIRequestBody } from '../../request/post/CreatePostAPIRequest'
import EditPostAPIRequest from '../../request/post/EditPostAPIRequest'

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
export function createComment(postId: string, body: CreateCommentAPIRequestBody): Promise<Post> {
  return new Promise(async (resolve, reject) => {
    try {
      const apiRequest = new CreateCommentAPIRequest(postId, body)
      const dataJSON = await fetch(apiRequest)
      const data: Post = new Post(get(dataJSON, 'data.data'))
      resolve(data)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}
export function deletePost(id: string): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      const apiRequest = new DeletePostAPIRequest(id)
      await fetch(apiRequest)

      resolve()
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}
export function createPost(body: PostAPIRequestBody): Promise<Post> {
  return new Promise(async (resolve, reject) => {
    try {
      const apiRequest = new CreatePostAPIRequest(body)
      const dataJSON = await fetch(apiRequest)
      const data: Post = new Post(get(dataJSON, 'data.data'))
      resolve(data)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}
export function updatePost(id: string, body: PostAPIRequestBody): Promise<Post> {
  return new Promise(async (resolve, reject) => {
    try {
      const apiRequest = new EditPostAPIRequest(id, body)
      const dataJSON = await fetch(apiRequest)
      const data: Post = new Post(get(dataJSON, 'data.data'))
      resolve(data)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}
