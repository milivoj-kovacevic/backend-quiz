
export default `
type Vehicle {
  id: Int!
  model: String
  make: String
  year: Int
}

type Query {
  vehicles: [Vehicle]
}

type Mutation {
  createVehicle(input: SaveVehicleInput!): SaveVehiclePayload
  updateVehicle(input: SaveVehicleInput!): SaveVehiclePayload
}

input SaveVehicleInput {
  id: Int
  year: Int
  make: String
  model: String
}

type SaveVehiclePayload{
  vehicle: Vehicle!
}`
