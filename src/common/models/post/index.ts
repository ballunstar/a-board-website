import Comment from '../comment'
import User from '../user'

export enum PostCategory {
  HISTORY = 'History',
  FOOD = 'Food',
  PETS = 'Pets',
  HEALTH = 'Health',
  FASHION = 'Fashion',
  EXERCISE = 'Exercise',
  OTHERS = 'Others'
}

class Post {
  id: string
  category: PostCategory
  title: string
  content: string
  author: User
  comments?: Comment[]
  commentCount: number
  createdAt: Date
  updatedAt: Date

  constructor(json: any) {
    this.id = json.id
    this.title = json.title
    this.category = json.category as PostCategory
    this.content = json.content
    this.author = new User(json.author)
    this.comments = json.comments ? json.comments.map((comment: any) => new Comment(comment)) : []
    this.commentCount = json.commentCount || 0
    this.createdAt = json.createdAt
    this.updatedAt = json.updatedAt
  }
}

export default Post
