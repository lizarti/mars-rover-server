import { IsIn, IsNumber, Max, Min } from 'class-validator'

export class AddRoverRequestDto {
  @IsNumber()
  @Min(1)
  landingPositionX!: number

  @IsNumber()
  @Min(1)
  landingPositionY!: number

  @IsNumber()
  @IsIn([0, -1, 1])
  landingOrientationX!: number

  @IsNumber()
  @IsIn([0, -1, 1])
  landingOrientationY!: number
}
