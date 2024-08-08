type GetWorldsResponseSizeDto = {
  height: number
  width: number
}

export class GetWorldsResponseDto {
  constructor(public readonly id: string, public readonly name: string, public readonly createdAt: string, public readonly size: GetWorldsResponseSizeDto, public readonly roversCount: number) {}
}