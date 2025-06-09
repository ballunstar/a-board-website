import User from '../user'

class Comment {
  id: string
  content: string
  author: User
  createdAt: Date
  updatedAt: Date

  constructor(json: any) {
    this.id = json.id
    this.content = json.content
    this.author = new User(json.author)
    this.createdAt = json.createdAt
    this.updatedAt = json.updatedAt
  }
}
export default Comment
