import { IStaff } from '../entity'
import { CreateRequestType } from './base'
import { Pagination } from './pagination'

// GET staffs/{staffId}
export type GetStaffRequest = CreateRequestType<{ staffID: string }, null, null, 'param'>

export type GetStaffResponse = {
  staff: IStaff
}

// GET admin/staffs/{staffId}
export type AdminGetStaffRequest = CreateRequestType<{ staffID: string }, null, null, 'param'>

export type AdminGetStaffResponse = {
  staff: IStaff
}

// GET admin/staffs
export type AdminListStaffsRequest = CreateRequestType<
  null,
  {
    page?: number
    perPage?: number
    displayName?: string
  },
  null,
  'query'
>

export type AdminListStaffsResponse = {
  staffs: IStaff[]
  pagination: Pagination
}

// POST admin/staffs/authorize
export type AdminStaffAuthorizeRequest = CreateRequestType<null, null, null, 'body'>

export type AdminStaffAuthorizeResponse = {
  staff: IStaff
}

// POST admin/staffs
export type AdminCreateStaffRequest = CreateRequestType<
  null,
  null,
  Pick<IStaff, 'displayName' | 'email' | 'phoneNumber' | 'iconImagePath'> & {
    shopId: string
    role: 'NORMAL' | 'SHOP_MANAGER'
  },
  'body'
>

// PATCH admin/staffs/read-notification
export type AdminReadNotifiationRequest = CreateRequestType<null, null, {}, 'body'>
export type AdminReadNotifiationResponse = {
  staff: IStaff
}

export type AdminCreateStaffResponse = {
  staff: IStaff
}

// POST admin/staffs/root
export type AdminCreateRootStaffRequest = CreateRequestType<
  null,
  null,
  Pick<IStaff, 'displayName' | 'email' | 'phoneNumber' | 'iconImagePath'>,
  'body'
>

export type AdminCreateRootStaffResponse = {
  staff: IStaff
}

// POST admin/staffs/company-manager
export type AdminCreateCompanyMangerRequest = CreateRequestType<
  null,
  null,
  Pick<IStaff, 'displayName' | 'email' | 'phoneNumber' | 'iconImagePath'>,
  'body'
>

export type AdminCreateCompanyMangerResponse = {
  staff: IStaff
}

// POST admin/staffs/shop-manager
export type AdminCreateShopMangerRequest = CreateRequestType<
  null,
  null,
  Pick<IStaff, 'displayName' | 'email' | 'phoneNumber' | 'iconImagePath'> & {
    shopId: string
  },
  'body'
>

export type AdminCreateShopMangerResponse = {
  staff: IStaff
}

// PATCH admin/staffs/{staffId}
export type AdminUpdateStaffRequest = CreateRequestType<
  {
    staffId: string
  },
  null,
  Partial<
    Pick<IStaff, 'displayName' | 'email' | 'phoneNumber' | 'iconImagePath'> & {
      role: 'NORMAL' | 'SHOP_MANAGER'
      shopId: string
    }
  >,
  'param' | 'body'
>

export type AdminUpdateStaffResponse = {
  staff: IStaff
}

// DELETE admin/staffs/{staffId}
export type AdminDeactivateStaffRequest = CreateRequestType<
  {
    staffId: string
  },
  null,
  null,
  'param'
>

export type AdminDeactivateStaffResponse = void

// PUT admin/staffs/{staffId}
export type AdminActivateStaffRequest = CreateRequestType<
  {
    staffId: string
  },
  null,
  null,
  'param'
>

export type AdminActivateStaffResponse = void

// ----------- root services ----------- //

// POST root/staffs
export type RootCreateRootStaffRequest = CreateRequestType<
  null,
  null,
  Pick<IStaff, 'displayName' | 'email' | 'phoneNumber' | 'iconImagePath'>,
  'body'
>

export type RootCreateRootStaffResponse = {
  staff: IStaff
}

// GET root/staffs
export type RootListStaffsRequest = CreateRequestType<
  null,
  {
    page?: number
    perPage?: number
    displayName?: string
  },
  null,
  'query'
>

export type RootListStaffsResponse = {
  staffs: IStaff[]
  pagination: Pagination
}

// PATCH root/staffs/{staffId}
export type RootUpdateStaffRequest = CreateRequestType<
  {
    staffId: string
  },
  null,
  Partial<
    Pick<IStaff, 'displayName' | 'email' | 'phoneNumber' | 'iconImagePath'> & {
      role: 'NORMAL' | 'SHOP_MANAGER'
    }
  >,
  'param' | 'body'
>

export type RootUpdateStaffResponse = {
  staff: IStaff
}

// DELETE root/staffs/{staffId}
export type RootDeleteStaffRequest = CreateRequestType<
  {
    staffId: string
  },
  null,
  null,
  'param'
>

export type RootDeleteStaffResponse = void
