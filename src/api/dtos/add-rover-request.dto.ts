import { IsIn, IsNumber, Max, Min } from 'class-validator'

export class AddRoverRequestDto {
  @IsNumber()
  @Min(0)
  landingPositionX!: number

  @IsNumber()
  @Min(0)
  landingPositionY!: number

  @IsNumber()
  @IsIn([0, -1, 1])
  landingOrientationX!: number

  @IsNumber()
  @IsIn([0, -1, 1])
  landingOrientationY!: number
}
