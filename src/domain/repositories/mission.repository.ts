import { Mission } from '../../domain'

export interface MissionRepository {
  create: (mission: Mission) => Promise<Mission>
  findByRoverId(roverId: string): Promise<Mission[]>
}
