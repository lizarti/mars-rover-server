import { IsNumber, Min } from 'class-validator'

export class CreateWorldRequestDto {
  @IsNumber()
  @Min(1)
  width: number

  @IsNumber()
  @Min(1)
  height: number
}
