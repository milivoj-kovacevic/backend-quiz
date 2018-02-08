import data from './data'

class Database {
  constructor() {
    this.data = data
  }

  get(modelName) {
    const model = require(`./models/${modelName}/model`).default
    return this.data[modelName].map(m => new model(m))
  }

  set(modelName, datum) {
    const data = this.data[modelName];
    let item = data.find(x => x.id === datum.id)
    if (item) {
      for (let prop in datum) {
        if (item.hasOwnProperty(prop))
          item[prop] = datum[prop]
      }
    } else {
      item = {
        ...datum,
        id: data.length + 1
      }
      data.push(item)
    }

    return item
  }

  delete(modelName, datum) {
    const data = this.data[modelName]
    this.data[modelName] = data.filter(obj => obj.id !== datum.id)
  }
}

export default new Database()
