import { Controller, Get, Param, UseGuards, Query } from '@nestjs/common'
import { StaffService } from './staff.service'
import { ShopManagerAuthGuard, AuthGuard } from '../auth/auth.guard'
import { AdminListStaffsResponse, newPagination, AdminGetStaffResponse } from '@fourside/interface'
import { AdminListStaffsRequestQuery } from './staff.request'
import { AuthUser, IAuthUser } from '../auth/auth.decorator'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('AdminStaffService')
@Controller('admin/staffs')
export class AdminStaffController {
  constructor(private readonly staffService: StaffService) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'スタッフの詳細情報を取得' })
  @Get(':staffId')
  async get(@Param('staffId') staffId: string): Promise<AdminGetStaffResponse> {
    return { staff: await this.staffService.adminGet(staffId) }
  }

  @UseGuards(ShopManagerAuthGuard)
  @ApiOperation({ summary: 'スタッフの一覧を取得' })
  @Get()
  async list(
    @AuthUser() { uid }: IAuthUser,
    @Query() params: AdminListStaffsRequestQuery
  ): Promise<AdminListStaffsResponse> {
    const { staffs, ttlCnt } = await this.staffService.adminList({
      page: params.page || 1,
      perPage: params.perPage || 999,
      displayName: params.displayName,
      staffId: uid
    })
    const pagination = newPagination({ page: params.page || 1, perPage: params.perPage || 10, ttlCnt })
    return { staffs, pagination }
  }
}
