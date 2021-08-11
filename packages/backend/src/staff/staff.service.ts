import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { Staff, StaffRepository } from './staff.entity'
import { FindManyOptions, IsNull, Like } from 'typeorm'
import { calcPaginationParam, datetime } from '../util'
import { InjectFirebaseAdmin, FirebaseAdmin } from '@fourside/nestjs-firebase'
import { generate } from 'generate-password'
import { Transactional } from 'typeorm-transactional-cls-hooked'

@Injectable()
export class StaffService {
  constructor(
    private staffRepository: StaffRepository,
    @InjectFirebaseAdmin()
    private firebase: FirebaseAdmin
  ) {}

  async get(id: string) {
    return this.staffRepository
      .findOneOrFail(id, { where: { deletedAt: IsNull() }, relations: ['shop', 'company'] })
      .catch(_ => {
        throw new NotFoundException(`スタッフが見つかりません`)
      })
  }

  async adminGet(id: string) {
    return this.staffRepository.findOneOrFail(id, { relations: ['shop', 'company'] }).catch(_ => {
      throw new NotFoundException(`スタッフが見つかりません`)
    })
  }

  @Transactional()
  async list(param: { page?: number; perPage?: number }) {
    const { skip, take } = calcPaginationParam(param.page, param.perPage)
    const where: FindManyOptions<Staff>['where'] = {
      deletedAt: IsNull()
    }

    const staffs = await this.staffRepository.find({ take, skip, where, relations: ['shop'] })
    const ttlCnt = await this.staffRepository.count({ where })
    return { staffs, ttlCnt }
  }

  @Transactional()
  async adminList(param: {
    page?: number
    perPage?: number
    displayName?: string
    shopId?: string
    companyId?: string
    staffId: string
  }) {
    const { skip, take } = calcPaginationParam(param.page, param.perPage)
    const where: FindManyOptions<Staff>['where'] = {
      deletedAt: IsNull()
    }

    if (param.displayName) {
      where.displayName = Like(`%${param.displayName}%`)
    }

    const staffs = await this.staffRepository.find({ take, skip, where })
    const ttlCnt = await this.staffRepository.count({ where })
    return { staffs, ttlCnt }
  }

  async authorize(id: string) {
    const staff = await this.staffRepository.findOneOrFail(id, { where: { deletedAt: IsNull() } }).catch(_ => {
      throw new NotFoundException(`スタッフが見つかりません`)
    })
    return staff
  }

  @Transactional()
  async create(
    param: Pick<Staff, 'displayName' | 'iconImagePath' | 'email' | 'phoneNumber'> & {
      shopId: string
      role: 'SHOP_MANAGER' | 'NORMAL'
    }
  ) {
    const staff = await this.staffRepository.findOne(undefined, { where: { email: param.email, deletedAt: IsNull() } })
    if (staff) {
      throw new ConflictException('すでに存在するスタッフです')
    }

    const password = generate({ length: 16, numbers: true })
    const firebaseStaff = await this.firebase.auth.createUser({
      email: param.email,
      password
    })

    const newStaff = new Staff()
    newStaff.id = firebaseStaff.uid
    newStaff.displayName = param.displayName
    newStaff.iconImagePath = param.iconImagePath
    newStaff.email = param.email
    newStaff.phoneNumber = param.phoneNumber
    const now = datetime.nowUnixTimestampSec()
    newStaff.createdAt = now
    newStaff.updatedAt = now

    await this.firebase.auth.setCustomUserClaims(newStaff.id, { role: 'NORMAL' })
    await this.staffRepository.insert(newStaff)

    return newStaff
  }

  @Transactional()
  async createForShopManager(
    param: Pick<Staff, 'displayName' | 'iconImagePath' | 'email' | 'phoneNumber'> & {
      shopId: string
    }
  ) {
    const staff = await this.staffRepository.findOne(undefined, { where: { email: param.email, deletedAt: IsNull() } })
    if (staff) {
      throw new ConflictException('すでに存在するスタッフです')
    }

    const password = generate({ length: 16, numbers: true })
    const firebaseStaff = await this.firebase.auth.createUser({
      email: param.email,
      password
    })

    const newStaff = new Staff()
    newStaff.id = firebaseStaff.uid
    newStaff.displayName = param.displayName
    newStaff.iconImagePath = param.iconImagePath
    newStaff.email = param.email
    newStaff.phoneNumber = param.phoneNumber
    const now = datetime.nowUnixTimestampSec()
    newStaff.createdAt = now
    newStaff.updatedAt = now

    await this.firebase.auth.setCustomUserClaims(newStaff.id, { role: 'SHOP_MANAGER' })
    await this.staffRepository.insert(newStaff)

    return newStaff
  }

  @Transactional()
  async createForCompanyManager(
    param: Pick<Staff, 'displayName' | 'iconImagePath' | 'email' | 'phoneNumber'> & { companyId: string }
  ) {
    const staff = await this.staffRepository.findOne(undefined, { where: { email: param.email, deletedAt: IsNull() } })
    if (staff) {
      throw new ConflictException('すでに存在するスタッフです')
    }

    const password = generate({ length: 16, numbers: true })
    const firebaseStaff = await this.firebase.auth.createUser({
      email: param.email,
      password
    })

    const newStaff = new Staff()
    newStaff.id = firebaseStaff.uid
    newStaff.displayName = param.displayName
    newStaff.iconImagePath = param.iconImagePath
    newStaff.email = param.email
    newStaff.phoneNumber = param.phoneNumber
    const now = datetime.nowUnixTimestampSec()
    newStaff.createdAt = now
    newStaff.updatedAt = now

    await this.firebase.auth.setCustomUserClaims(newStaff.id, { role: 'COMPANY_MANAGER' })
    await this.staffRepository.insert(newStaff)

    return newStaff
  }

  @Transactional()
  async createForRoot(param: Pick<Staff, 'displayName' | 'iconImagePath' | 'email' | 'phoneNumber'>) {
    const staff = await this.staffRepository.findOne(undefined, { where: { email: param.email, deletedAt: IsNull() } })
    if (staff) {
      throw new ConflictException('すでに存在するスタッフです')
    }

    const password = generate({ length: 16, numbers: true })
    const firebaseStaff = await this.firebase.auth.createUser({
      email: param.email,
      password
    })

    const newStaff = new Staff()
    newStaff.id = firebaseStaff.uid
    newStaff.displayName = param.displayName
    newStaff.iconImagePath = param.iconImagePath
    newStaff.email = param.email
    newStaff.phoneNumber = param.phoneNumber
    const now = datetime.nowUnixTimestampSec()
    newStaff.createdAt = now
    newStaff.updatedAt = now

    await this.firebase.auth.setCustomUserClaims(newStaff.id, { role: 'ROOT' })
    await this.staffRepository.insert(newStaff)

    return newStaff
  }

  @Transactional()
  async update(
    param: Partial<Pick<Staff, 'displayName' | 'iconImagePath' | 'email' | 'phoneNumber'>> & {
      id: string
      shopId?: string
    }
  ) {
    const staff = await this.staffRepository.findOneOrFail(param.id, { where: { deletedAt: IsNull() } }).catch(_ => {
      throw new NotFoundException(`スタッフが見つかりません`)
    })

    if (param.displayName) staff.displayName = param.displayName
    if (param.iconImagePath) staff.iconImagePath = param.iconImagePath

    staff.updatedAt = datetime.nowUnixTimestampSec()

    if (param.email) {
      staff.email = param.email
      await this.firebase.auth.updateUser(param.id, { email: param.email })
    }

    if (param.phoneNumber) {
      staff.phoneNumber = param.phoneNumber
    }

    return this.staffRepository.save(staff)
  }

  @Transactional()
  async updateLastReadNotificationAt(param: { id: string }) {
    const staff = await this.staffRepository.findOneOrFail(param.id, { where: { deletedAt: IsNull() } }).catch(_ => {
      throw new NotFoundException(`スタッフが見つかりません`)
    })
    const now = datetime.nowUnixTimestampSec()
    staff.updatedAt = now
    return this.staffRepository.save(staff)
  }

  @Transactional()
  async deactivate(id: string) {
    const now = datetime.nowUnixTimestampSec()
    await this.staffRepository.update(id, {
      updatedAt: now,
      deletedAt: now
    })
  }

  @Transactional()
  async activate(id: string) {
    await this.staffRepository.findOneOrFail(id).catch(_ => {
      throw new NotFoundException(`スタッフが見つかりません`)
    })

    await this.firebase.auth.updateUser(id, { disabled: false })

    await this.staffRepository.update(id, {
      deletedAt: undefined,
      updatedAt: datetime.nowUnixTimestampSec()
    })
  }
}
