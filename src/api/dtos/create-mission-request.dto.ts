import {
  IsNotEmpty,
  IsString,
  Validate,
  ValidationArguments,
  ValidatorConstraintInterface
} from 'class-validator'

class InstructionValidator implements ValidatorConstraintInterface {
  validate(value: string) {
    return value.split('').every((instruction) => {
      return ['L', 'R', 'M'].includes(instruction)
    })
  }
}

export class CreateMissionRequestDto {
  @IsString()
  @IsNotEmpty()
  @Validate(InstructionValidator, {
    message:
      'Invalid instruction. The instructions must be a string containing only the characters L, R or M'
  })
  instructions: string
}
