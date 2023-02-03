import { IsBoolean, IsString } from "class-validator"
import { IsNotEmpty } from "class-validator/types/decorator/decorators"

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
