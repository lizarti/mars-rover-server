import 'dotenv/config'
import cors from 'cors'

import { LoggerMiddleware, MissionController, RoverController, WorldController } from './api'
import { ExpressServer, MissionKnexRepository, RoverKnexRepository } from './infra'
import {
  AddRoverUseCase,
  CreateMissionUseCase,
  CreateWorldUseCase,
  DeleteWorldUseCase,
  GetRoversFromWorldUseCase,
  GetRoverWithWorldUseCase,
  GetWorldByIdUseCase,
  GetWorldsUseCase,
  VaporizeRoverUseCase
} from './application'
import {
  AddRoverService,
  CreateRoverMissionService,
  CreateWorldService,
  DeleteWorldService,
  GetRoverByIdService,
  GetRoversFromWorldService,
  GetWorldByIdService,
  GetWorldsService
} from './domain'
import { WorldKnexRepository } from './infra/repositories/knex/world.knex-repository'
import { HomeController } from './api/controllers/home.controller'
import { ConsolaLogger } from './infra/logging'

const roverRepository = new RoverKnexRepository('rovers')
const worldRepository = new WorldKnexRepository('worlds')
const missionRepository = new MissionKnexRepository('missions')

const addRoverService = new AddRoverService(roverRepository)
const getRoverByIdService = new GetRoverByIdService(
  roverRepository,
  worldRepository,
  missionRepository
)
const getWorldbyIdService = new GetWorldByIdService(worldRepository, roverRepository)
const getRoversFromWorldService = new GetRoversFromWorldService(roverRepository)
const createWorldService = new CreateWorldService(worldRepository)
const createWorldUseCase = new CreateWorldUseCase(createWorldService)
const createMissionService = new CreateRoverMissionService(missionRepository, roverRepository)
const getWorldsService = new GetWorldsService(worldRepository)
const deleteWorldService = new DeleteWorldService(worldRepository)

const addRoverUseCase = new AddRoverUseCase(addRoverService, getWorldbyIdService)
const getRoversWithWorldUseCase = new GetRoverWithWorldUseCase(
  getRoverByIdService,
  getWorldbyIdService
)
const getRoversFromWorldUseCase = new GetRoversFromWorldUseCase(getRoversFromWorldService)
const createMissionUseCase = new CreateMissionUseCase(createMissionService, getRoverByIdService)
const vaporizeRoverUseCase = new VaporizeRoverUseCase(roverRepository)
const getWorldByIdUseCase = new GetWorldByIdUseCase(getWorldbyIdService)
const getWorldsUseCase = new GetWorldsUseCase(getWorldsService)
const deleteWorldUseCase = new DeleteWorldUseCase(deleteWorldService)

const roverController = new RoverController(
  addRoverUseCase,
  getRoversWithWorldUseCase,
  getRoversFromWorldUseCase,
  vaporizeRoverUseCase
)
const windowController = new WorldController(getWorldsUseCase, createWorldUseCase, getWorldByIdUseCase, deleteWorldUseCase)
const missionController = new MissionController(createMissionUseCase)

const homeController = new HomeController()

const consolaLogger = new ConsolaLogger()
const loggerMiddleware = new LoggerMiddleware(consolaLogger)  

const server = new ExpressServer([roverController, windowController, missionController, homeController], [cors(), loggerMiddleware.install()], 3000)
server.start()
