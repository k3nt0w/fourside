export class LedgerLiquidWrapper {
  public constructor() {}

  public connect = () => ({
    success: true,
    disconnect: true
  })

  public getSignature = jest.fn().mockResolvedValue({
    signatureList: []
  })

  public disconnect = jest.fn().mockResolvedValue({})
}
export enum NetworkType {}
export type WalletUtxoData = any
