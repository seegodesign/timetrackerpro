import { Model } from '@vuex-orm/core'
import Project from './Project'

export default class Client extends Model {
  static entity = 'clients'

  static fields () {
    return {
      id: this.increment(),
      name: this.attr(''),
      projects: this.hasMany(Project, 'client_id')
    }
  }
}
