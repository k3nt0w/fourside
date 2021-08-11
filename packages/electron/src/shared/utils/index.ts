export function inverseObject(obj: any, keyIsNumber: boolean) {
  return Object.keys(obj).reduceRight(function (ret: any, k: any) {
    return (ret[obj[k]] = keyIsNumber ? parseInt(k, 10) : k), ret
  }, {})
}

export const isDevNodeEnv = process.env.NODE_ENV === 'development'

export const isLocalDeployEnv = process.env.DEPLOY_ENV === 'local'
export const isDevDeployEnv = process.env.DEPLOY_ENV === 'dev'
export const isDevWithoutAutoUpdateDeployEnv = process.env.DEPLOY_ENV === 'dev-without-autoupdate'
