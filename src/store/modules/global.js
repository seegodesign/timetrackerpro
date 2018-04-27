const getters = {
  selections: state => state.selections,
  isResizing: state => state.isResizing,
  lastDownY: state => state.lastDownY,
}
const mutations = {
  setSelections: (state, val) => state.selections = val,
  setSelectedClient: (state, val) => state.selections.client = val,
  setSelectedProject: (state, val) => state.selections.project = val,
  setSelectedLineItems: (state, val) => state.selections.lineitems = val,
  setIsResizing: (state, val) => state.isResizing = val,
  setLastDownY: (state, val) => state.lastDownY = val,
}
const state = {
  selections: {
    client: null,
    project: null,
    lineitems: null
  },
  isResizing: false,
  lastDownY: 0
}

export default {
  namespaced: true,
  getters,
  mutations,
  state,
}