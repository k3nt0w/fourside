export interface User {
  id: string
  name: string
}

export const newUser = (param: User): User => ({ ...param })
