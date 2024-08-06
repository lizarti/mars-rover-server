import 'dotenv/config'
import { MissionController, RoverController, WorldController } from './api'
import { ExpressServer, MissionKnexRepository, RoverKnexRepository } from './infra'
import {
  AddRoverUseCase,
  CreateMissionUseCase,
  CreateWorldUseCase,
  GetRoversFromWorldUseCase,
  GetRoverWithWorldUseCase
} from './application'
import {
  AddRoverService,
  CreateRoverMissionService,
  CreateWorldService,
  GetRoverByIdService,
  GetRoversFromWorldService,
  GetWorldByIdService
} from './domain'
import { WorldKnexRepository } from './infra/repositories/knex/world.knex-repository'

const roverRepository = new RoverKnexRepository('rovers')
const worldRepository = new WorldKnexRepository('worlds')
const missionRepository = new MissionKnexRepository('missions')

const addRoverService = new AddRoverService(roverRepository)
const getRoverByIdService = new GetRoverByIdService(
  roverRepository,
  worldRepository,
  missionRepository
)
const getWorldbyIdService = new GetWorldByIdService(worldRepository)
const getRoversFromWorldService = new GetRoversFromWorldService(roverRepository)
const createWorldService = new CreateWorldService(worldRepository)
const createWorldUseCase = new CreateWorldUseCase(createWorldService)
const createMissionService = new CreateRoverMissionService(missionRepository, roverRepository)

const addRoverUseCase = new AddRoverUseCase(addRoverService, getWorldbyIdService)
const getRoversWithWorldUseCase = new GetRoverWithWorldUseCase(
  getRoverByIdService,
  getWorldbyIdService
)
const getRoversFromWorldUseCase = new GetRoversFromWorldUseCase(getRoversFromWorldService)
const createMissionUseCase = new CreateMissionUseCase(createMissionService, getRoverByIdService)

const roverController = new RoverController(
  addRoverUseCase,
  getRoversWithWorldUseCase,
  getRoversFromWorldUseCase
)
const windowController = new WorldController(createWorldUseCase)
const missionController = new MissionController(createMissionUseCase)

const server = new ExpressServer([roverController, windowController, missionController], 3000)
server.start()
