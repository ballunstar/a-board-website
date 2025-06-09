import { fetch } from '@/services/fetch-api'

import { get } from 'lodash'
import SignInResponse from '@/common/models/auth'
import SignInAPIRequest, { SignInAPIRequestBody } from '../../request/auth/SignInAPIRequest'
import GetProfileAPIRequest from '../../request/auth/GetProfileAPIRequest'
import User from '@/common/models/user'

export function signIn(body: SignInAPIRequestBody): Promise<{ token: string }> {
  return new Promise(async (resolve, reject) => {
    try {
      const apiRequest = new SignInAPIRequest(body)
      const dataJSON = await fetch(apiRequest)
      const result: SignInResponse = new SignInResponse(get(dataJSON, 'data.data'))

      resolve({
        token: result.accessToken
      })
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

export function getProfile(): Promise<User> {
  return new Promise(async (resolve, reject) => {
    try {
      const apiRequest = new GetProfileAPIRequest()
      const dataJSON = await fetch(apiRequest)
      const result: User = new User(get(dataJSON, 'data.data'))

      resolve(result)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}
