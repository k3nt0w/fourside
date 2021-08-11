import { ApiProperty } from '@nestjs/swagger'
import { Pagination as IPagination } from '@fourside/interface'
import { IsOptional, IsNumber, IsBoolean } from 'class-validator'

export abstract class PaginationQuery {
  @ApiProperty({ description: 'ページネーション: ページ番号', default: 1, required: false })
  @IsNumber()
  @IsOptional()
  page?: number

  @ApiProperty({ description: 'ページネーション: 1ページのデータ数', default: 10, required: false })
  @IsNumber()
  @IsOptional()
  perPage?: number
}

export abstract class Pagination implements IPagination {
  @ApiProperty({ description: 'ヒット件数', example: 45 })
  @IsNumber()
  totalCount: number

  @ApiProperty({ description: 'オフセット', example: 15, required: false })
  @IsOptional()
  @IsNumber()
  offsetValue?: number

  @ApiProperty({ description: '1ページのデータ数', example: 10 })
  @IsNumber()
  perPage: number

  @ApiProperty({ description: 'ページ総数', example: 7, required: false })
  @IsOptional()
  @IsNumber()
  totalPages?: number

  @ApiProperty({ description: '現在のページ', example: 3 })
  @IsNumber()
  currentPage: number

  @ApiProperty({ description: '次のページ', example: 4, required: false })
  @IsOptional()
  @IsNumber()
  nextPage?: number

  @ApiProperty({ description: '前のページ', example: 2, required: false })
  @IsOptional()
  @IsNumber()
  prevPage?: number

  @ApiProperty({ description: '最初のページ', example: 1, required: false })
  @IsOptional()
  @IsBoolean()
  isFirstPage?: boolean

  @ApiProperty({ description: '最後のページ', example: 1, required: false })
  @IsOptional()
  @IsBoolean()
  isLastPage?: boolean
}

export abstract class UnixTimestamp {
  @ApiProperty({ description: 'データ作成日時を表すUnixTime（秒）', example: '1610377347' })
  @IsNumber()
  createdAt: number

  @ApiProperty({ description: 'データ更新日時を表すUnixTime（秒）', example: '1610377347' })
  @IsNumber()
  updatedAt: number
}
