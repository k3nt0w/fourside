import { Module } from '@nestjs/common'
import { AdminStaffController } from './staff.controller'
import { StaffService } from './staff.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Staff } from './staff.entity'
import { LoggerModule } from '../logger/logger.module'

@Module({
  imports: [TypeOrmModule.forFeature([Staff]), LoggerModule],
  controllers: [AdminStaffController],
  providers: [StaffService]
})
export class StaffModule {}
