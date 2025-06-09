import get from 'lodash/get'

class SignInResponse {
  accessToken: string

  constructor(json: any) {
    this.accessToken = get(json, 'accessToken')
  }
}

export default SignInResponse
