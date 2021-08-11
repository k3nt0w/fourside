import { ApiProperty } from '@nestjs/swagger'
import { IStaff, ExtractPropertyType, AdminListStaffsRequest } from '@fourside/interface'
import { IsString, IsOptional, IsNumberString } from 'class-validator'
import { PaginationQuery, UnixTimestamp } from '../base/bose.request'

export abstract class Staff extends UnixTimestamp implements IStaff {
  @ApiProperty({ description: 'Firebase UUID', example: 'ac916d92-9e6f-4711-a6f1-1dad15f65e65' })
  @IsString()
  id: string

  @ApiProperty({ description: '表示名', example: 'fourside Taro' })
  @IsString()
  displayName: string

  @ApiProperty({ description: 'アイコン画像のパス', example: 'icon_image_path.jpg' })
  @IsString()
  iconImagePath: string

  @ApiProperty({ description: 'Eメールアドレス', example: 'taro@sample.com' })
  @IsString()
  email: string

  @ApiProperty({ description: '電話番号', example: '090000000' })
  @IsString()
  phoneNumber: string
}

export abstract class AdminListStaffsRequestQuery
  extends PaginationQuery
  implements ExtractPropertyType<AdminListStaffsRequest, 'query'>
{
  @ApiProperty({ description: 'スタッフ名', example: 'test name' })
  @IsString()
  @IsOptional()
  displayName?: string

  @ApiProperty({ description: 'page', example: '1' })
  @IsNumberString()
  @IsOptional()
  page?: number

  @ApiProperty({ description: 'perPage', example: '10' })
  @IsNumberString()
  @IsOptional()
  perPage?: number
}
