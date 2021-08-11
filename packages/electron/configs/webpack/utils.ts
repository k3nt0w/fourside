import cla from 'command-line-args'

export const getEnvDependentVariables = (env: string) => {
  switch (env) {
    case 'dev':
      return {
        LEDGER_NETWORK_TYPE: 'Regtest'
      }
    case 'test':
      return {
        LEDGER_NETWORK_TYPE: 'Regtest'
      }
    case 'demo':
      return {
        LEDGER_NETWORK_TYPE: 'Regtest'
      }
    case 'prod':
      return {
        LEDGER_NETWORK_TYPE: 'LiquidV1'
      }
    case 'local':
    default:
      return {
        LEDGER_NETWORK_TYPE: 'Regtest'
      }
  }
}

/*
  マルチブート対応
  Electronを複数起動する際、
  永続化領域の名前空間が衝突しないようにするために、
  usertypeとして任意の起動名を指定できるようにしている
*/
interface ArgOptions {
  devport: number
  usertype: string
}

const optionDefinitions = [
  { name: 'usertype', alias: 'u', type: String },
  { name: 'devport', alias: 'd', type: Number },
  { name: 'config', type: String }
]
const options = cla(optionDefinitions)

export const args: ArgOptions = {
  devport: options.devport || 8001,
  usertype: options.usertype || 'default'
}
