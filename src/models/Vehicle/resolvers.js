import db from '../../db'
import Model from './model'
import { Resolvers, } from '../../utils'
import { validateVehicle } from './validator'

export default {
  Query: {
    vehicles: Resolvers.Query.list(Model),
  },
  Mutation: {
    createVehicle: Resolvers.Mutation.save(Model, [validateVehicle]),
    updateVehicle: Resolvers.Mutation.save(Model, [validateVehicle])
  },
}