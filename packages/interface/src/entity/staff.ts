import { IBase } from './base'

export interface IStaff extends IBase {
  id: string
  displayName: string
  iconImagePath: string
  email: string
  phoneNumber?: string
}
