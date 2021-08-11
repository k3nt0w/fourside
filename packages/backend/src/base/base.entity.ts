import { Column } from 'typeorm'

export class BaseEntity {
  @Column({ type: 'int', name: 'created_at' })
  createdAt: number

  @Column({ type: 'int', name: 'updated_at' })
  updatedAt: number

  @Column({ type: 'int', name: 'deleted_at', nullable: true })
  deletedAt: number
}
