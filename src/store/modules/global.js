const getters = {
  selections: state => state.selections,
}
const mutations = {
  setSelections: (state, val) => state.selections = val,
  setSelectedClient: (state, val) => state.selections.client = val,
  setSelectedProject: (state, val) => state.selections.project = val,
  setSelectedLineItems: (state, val) => state.selections.lineitems = val,
}
const state = {
  selections: {
    client: null,
    project: null,
    lineitems: null
  }
}

export default {
  namespaced: true,
  getters,
  mutations,
  state,
}