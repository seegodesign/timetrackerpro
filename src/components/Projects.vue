<template lang="pug">
  .projects(v-show='selections.client')
    .projects__toolbar.columns
      .column
        h2.subtitle {{ clientName }} Projects
      .column
        a.is-pulled-right(@click='add') + Add Project
    datatable(ref='projectsTable' :data='projects' :settings='dataTableSettings')
</template>

<script>
  import $ from 'jquery'
  import store from '../store'
  import HotTable from '@handsontable/vue'
  import { mapGetters } from 'vuex'
  import EventBus from '../event-bus.js'

  export default {
    store,

    name: 'Projects',
    components: {
      'datatable': HotTable      
    },
    computed: {
      ...mapGetters({
        selections: 'global/selections',
      }),
      clientName(){
        let clientId = this.selections.client
        return clientId && this.$store.state.entities.clients.data[clientId] ? this.$store.state.entities.clients.data[clientId].name : ''
      },
      projects(){
        return this.selections.client ? this.$store.getters['entities/projects']().where('client_id', this.selections.client).orderBy('id', 'desc').get() : []
      },
    },
    mounted(){
      EventBus.$on('VERTICAL_DRAG', this.vdrag)
    },
    methods: {
      vdrag(e) {
        let minHeight = 80
        let height = e.clientY - 145
        $('.projects .handsontable').css('height', height < minHeight ? minHeight : height)
        if (this.$refs.projectsTable) this.$refs.projectsTable.table.render()  
      },
      add() {
        this.$store.dispatch('entities/projects/insert', {
          data: { 
            client_id: this.selections.client
          }
        })
      },
      update(id, payload) {
        this.$store.dispatch('entities/projects/update', { 
          where: id,
          data: payload
        })
      },
      destroy(id) {
        if (confirm('Are you sure you want to do that?')) this.$store.dispatch('entities/projects/delete', id)
      }
    },
    data(){
      let that = this
      return {
        dataTableSettings: {
          stretchH: 'all',
          manualColumnResize: true,
          multiSelect: false,
          disableVisualSelection: ['current', 'area'],
          currentRowClassName: 'currentRow',
          selectionMode: 'single',
          afterSelectionByProp: (r, c, r2, c2, preventScrolling, selectionLayerLevel) => {
            // Set the selected project to the contents of the first row (project ID)
            let projectsTable = that.$refs.projectsTable
            let rowData = projectsTable.table.getDataAtRow(r)
            this.$store.commit('global/setSelectedProject', rowData[0])
          },
          afterChange: (changes, source) => {
            if (changes){
              let rowNum = changes[0][0]
              let property = changes[0][1]
              let newVal = changes[0][3]
              let projectsTable = that.$refs.projectsTable
              let rowData = projectsTable.table.getDataAtRow(rowNum)
              let projectId = rowData[0]
              let payload = { id: projectId }
              payload[property] = newVal
              that.update(projectId, payload)
            }
          },
          columns: [
            {
              data: 'id',
              type: 'numeric',
              width: 1,
              editor: false,
            },
            {
              data: 'name',
              type: 'text',
              // editor: false,
            },
            {
              data: 'status',
              type: 'dropdown',
              source: ['active','complete']
            },
            {
              data: 'description',
              type: 'text',
              // editor: false,
            },
          ],
          colHeaders: [
            'id',
            'Project Name',
            'Status',
            'Description'
          ],
          height: 100,
        },
      }
    }
  }
</script>

<style scoped lang="stylus">
  $gray = #dedede
  .projects__toolbar
    .column
      padding-bottom 0
  .subtitle
    // margin-bottom 10px
  .projects
    margin 0 10px
    padding 10px 0
    // border-bottom solid 1px $gray
</style>
