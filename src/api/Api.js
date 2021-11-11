import {client as airtable} from 'api/initialize'
import Cache from 'api/Cache'

class Api {
  constructor(table, enableCache = true) {
    this.api = airtable(table)
    this.cache = new Cache()
    this.enableCache = enableCache

    this.func = null
    this.params = null
    this._method = null
    this.resetCacheMethods = [
      'createMany', 'createOne',
      'updateMany', 'updateOne',
      'deleteMany', 'deleteOne',
    ]
    this.cacheMethodsToReset = [
      'getMany', 'getOne'
    ]
  }

  makeRequest() {
    return new Promise(async resolve => {
      // if (this.resetCacheMethods.includes(this._method)) {
      //   this.cache.reset(this.cacheMethodsToReset)
      // }

      // // Check if we have a valid cache value
      // if (this.cache.isValid(this._method) && this.enableCache) {
      //   return resolve(this.cache.get(this._method))
      // } else {
      //   this.cache.reset()
      // }

      const res = this.params
        ? await this.func(this.params).catch(() => console.log('Error man!'))
        : await this.func().catch(() => console.log('Error man!'))
    
      if (!res) {
        return resolve({status: 'error', data: 'some message'})
      }
  
      const data = Array.isArray(res)
          ? res.map(record => record.fields)
          : res

      // If we are this far, set the cache
      // this.cache.set(this._method, {status: 'ok', data})
  
      return resolve({status: 'ok', data})
    })
  }

  async getMany() {
    this.params = null
    this.func = this.api.select().firstPage
    this._method = 'getMany'

    return await this.makeRequest()
  }

  async getOne(id) {
    this.params = id
    this.func = this.api.find
    this._method = 'getOne'

    return await this.makeRequest()
  }

  async createMany(objs) {
    this.params = objs
    this.func = this.api.create
    this._method = 'createMany'

    return await this.makeRequest()
  }

  async createOne(obj) {
    this.params = [{fields: obj}]
    this.func = this.api.create
    this._method = 'createOne'

    return await this.makeRequest()
  }

  async updateMany(objs) {
    this.params = objs
    this.func = this.api.update
    this._method = 'updateMany'

    return await this.makeRequest()
  }

  async updateOne(obj) {
    this.params = [obj]
    this.func = this.api.update
    this._method = 'updateOne'

    return await this.makeRequest()
  }

  async deleteMany(ids) {
    this.params = ids
    this.func = this.api.destroy
    this._method = 'deleteMany'

    return await this.makeRequest()
  }

  async deleteOne(id) {
    this.params = [id]
    this.func = this.api.destroy
    this._method = 'deleteOne'

    return await this.makeRequest()
  }
}

export default Api