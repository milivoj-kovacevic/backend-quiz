import db from '../../db'

export const Resolvers = {
  Query: {
    list: (Model) => (unusedFirstParameter, args, context) => {
      return db.get(Model.name)
    },
    item: (Model) => (unusedFirstParameter, args, context) => {
      const { id } = args
      return db.get(Model.name).find(x => x.id === id)
    },
  },
  Mutation: {
    delete: (Model) => (unusedFirstParameter, args) => {
      const { input, } = args
      db.delete(Model.name, input)
      return {
        id: input.id,
      }
    },
    save: (Model, validators) => (unusedFirstParameter, args) => {
      const { input } = args
      if (validators.length > 0) {
        let errors = []
        validators.forEach(validate => {
          const err = validate(input)
          if (err) {
            errors.push(err)
          }
        });
        if (errors.length > 0) {
          throw new Error(errors.join())
        }
      }
      const item = db.set(Model.name, input)
      const name = Model.name.toLocaleLowerCase()
      return { [name]: item }
    }
  }
}
