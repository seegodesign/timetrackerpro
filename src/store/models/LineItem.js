import { Model } from '@vuex-orm/core'
import Project from './Project'

export default class LineItem extends Model {
  static entity = 'lineitems'

  static fields () {
    return {
      id: this.attr(null),
      description: this.attr(''),
      project_id: this.attr(null),
      type: this.attr(''),
      qty: this.attr(null),
      rate: this.attr(null),
      done: this.attr(null),
      project: this.belongsTo(Project, 'project_id')
    }
  }
}
