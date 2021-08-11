import * as fs from 'fs'

export const makeTempDirctory = (path: string) => {
  try {
    fs.accessSync(path)
  } catch (e) {
    fs.mkdirSync(path)
  }
}

export const removeTempDirctory = (path: string) => {
  try {
    fs.rmdirSync(path, { recursive: true })
  } catch (e) {
    console.error(e)
    throw new Error('tempディレクトリを削除できませんでした。')
  }
}
