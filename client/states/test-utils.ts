import faker from 'faker'

// fix seed
faker.seed(123)

const times = <T>(n: number, cb: () => T): T[] => {
  const result: T[] = []
  for (let index = 0; index < n; index++) {
    result.push(cb())
  }
  return result
}

const toArray = <T>(cb: () => T, min: number = 1, max: number = 5): T[] => {
  return times(faker.random.number({ min, max }), cb)
}

export { faker, toArray }
