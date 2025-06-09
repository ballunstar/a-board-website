export enum UserRoleEnum {
  ADMIN = 'admin',
  USER = 'user'
}

class User {
  id: number
  email: string
  firstName: string
  lastName: string
  role: UserRoleEnum = UserRoleEnum.USER
  avatarUrl?: string

  constructor(json: any) {
    this.id = json.id
    this.email = json.email
    this.firstName = json.firstName
    this.lastName = json.lastName
  }
  get fullName(): string {
    if (!this.firstName && !this.lastName) {
      return this.email
    }
    return `${this.firstName || ''} ${this.lastName || ''}`.trim()
  }
}

export default User
