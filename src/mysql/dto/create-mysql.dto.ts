import { IsBoolean, IsString, IsNotEmpty } from "class-validator"

export class CreateMysqlDto {

  @IsString()
  @IsNotEmpty()
  firstName: string

  @IsString()
  @IsNotEmpty()
  lastName: string

  @IsBoolean()
  isActive?: boolean
}
