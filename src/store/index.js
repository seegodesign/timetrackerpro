import Vue from 'vue'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import database from './database'
import global from './modules/global' 

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [VuexORM.install(database)],
  modules: {
    global
  }
})

export default store
