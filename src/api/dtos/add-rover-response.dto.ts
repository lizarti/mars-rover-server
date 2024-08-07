export class AddRoverResponseDto {
  id: string
  position: {
    x: number
    y: number
  }
  orientation: {
    x: number
    y: number
  }
}