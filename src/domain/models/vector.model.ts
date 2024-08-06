import { CardinalOrientationEnum } from '../enums'

export class Vector {
  constructor(public x: number, public y: number) {}

  add(vector: Vector): Vector {
    return new Vector(this.x + vector.x, this.y + vector.y)
  }

  multiply(scalar: number): Vector {
    return new Vector(this.x * scalar, this.y * scalar)
  }

  turnClockwise(): Vector {
    const newVector = new Vector(this.y, -this.x)
    console.log(
      `[Vector] Turning clockwise from (${this.x}, ${this.y}) to (${newVector.x}, ${newVector.y})`
    )
    return newVector
  }

  turnAnticlockwise(): Vector {
    const newVector = new Vector(-this.y, this.x)
    console.log(
      `[Vector] Turning anticlockwise from (${this.x}, ${this.y}) to (${newVector.x}, ${newVector.y})`
    )
    return newVector
  }

  crossProduct(vector: Vector): number {
    return this.x * vector.y - this.y * vector.x
  }

  clone(): Vector {
    return new Vector(this.x, this.y)
  }

  isIdentical(vector: Vector): boolean {
    return this.x === vector.x && this.y === vector.y
  }

  toCardinalOrientation(): CardinalOrientationEnum {
    if (this.x === 0) {
      if (this.y === 1) {
        return CardinalOrientationEnum.NORTH
      }
      if (this.y === -1) {
        return CardinalOrientationEnum.SOUTH
      }
    }
    if (this.y === 0) {
      if (this.x === 1) {
        return CardinalOrientationEnum.EAST
      }
      if (this.x === -1) {
        return CardinalOrientationEnum.WEST
      }
    }
    throw new Error('Invalid orientation')
  }
}
