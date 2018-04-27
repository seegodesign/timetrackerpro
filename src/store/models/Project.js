import { Model } from '@vuex-orm/core'
import Client from './Client'
import LineItem from './LineItem'

export default class Project extends Model {
  static entity = 'projects'

  static fields () {
    return {
      id: this.increment(),
      client_id: this.attr(null),
      name: this.attr(''),
      description: this.attr(''),
      status: this.attr(''),
      done: this.attr(false),
      assignee: this.belongsTo(Client, 'client_id'),
      lineitems: this.hasMany(LineItem, 'project_id')      
    }
  }
}
