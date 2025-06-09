class APIResponse {
  success: boolean
  data: any

  constructor(data: any, success: boolean = false) {
    this.success = success
    this.data = data
  }
}

export default APIResponse
