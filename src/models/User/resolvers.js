import Model from './model'
import { Resolvers, } from '../../utils'
import db from '../../db'
export default {
  Query: {
    users: Resolvers.Query.list(Model),
    user: Resolvers.Query.item(Model),
    profitableUsers: (obj, { top }) => getSpend(db).sort((a, b) => b.spend - a.spend).slice(0, top)
  },
  Mutation: {
    deleteUser: Resolvers.Mutation.delete(Model),
  },
  User: {
    vehicles: (obj, args, context) => {
      return db.get('Vehicle').filter(vehicle => vehicle.userId === obj.id)
    },
    displayName: user => `${user.firstName} ${user.lastName.charAt(0)}.`
  },
}


const getSpend = db =>
  db.get('User').map(user => ({
    user,
    spend: db.get('Vehicle')
      .filter(v => v.userId === user.id)
      .reduce((result, item) => {
        const filteredOrders = db.get('Order').filter(o => o.vehicleId === item.id)
        const sum = filteredOrders.reduce((res, { price }) => (res + price), 0)
        return result + sum
      }, 0)
  }))