import { Database } from '@vuex-orm/core'
import Client from './models/Client'
import clients from './modules/clients'
import Project from './models/Project'
import projects from './modules/projects'
import LineItem from './models/LineItem'
import lineitems from './modules/lineitems'

const database = new Database()

database.register(Client, clients)
database.register(Project, projects)
database.register(LineItem, lineitems)

export default database
