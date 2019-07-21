import { faker, toArray } from '../../test-utils'

const count = (): number => faker.random.number()

export const factories = {
  countList: toArray(count)
}
