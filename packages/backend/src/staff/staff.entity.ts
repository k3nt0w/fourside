import { Entity, Column, PrimaryColumn, EntityRepository } from 'typeorm'
import { BaseRepository } from 'typeorm-transactional-cls-hooked'
import { BaseEntity } from '../base/base.entity'

@Entity({ name: 'staffs' })
export class Staff extends BaseEntity {
  @PrimaryColumn()
  id: string

  @Column({ name: 'display_name', length: 36 })
  displayName: string

  @Column({ name: 'icon_image_path', length: 3000 })
  iconImagePath: string

  @Column({ name: 'email', length: '512', nullable: true, unique: true })
  email: string

  @Column({ name: 'phone_number', length: '17', nullable: true })
  phoneNumber: string
}

@EntityRepository(Staff)
export class StaffRepository extends BaseRepository<Staff> {}
