import { IsString } from 'class-validator'
import { SignInRequest, ExtractPropertyType } from '@fourside/interface'

export class SignInRequestDto implements ExtractPropertyType<SignInRequest, 'body'> {
  @IsString()
  userID!: string

  @IsString()
  password!: string
}
