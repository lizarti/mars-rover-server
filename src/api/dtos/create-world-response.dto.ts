export class CreateWorldResponseDto {
  constructor(public readonly id: string, public readonly name: string, public readonly width: number, public readonly height: number) {}
}