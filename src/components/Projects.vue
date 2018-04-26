<template lang="pug">
  .projects
    datatable(ref='projectsTable' :data='projects' :settings='dataTableSettings')
</template>

<script>
  import $ from 'jquery'
  import store from '../store'
  import HotTable from '@handsontable/vue'
  import { mapGetters } from 'vuex'

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
      projects(){
        return this.$store.getters['entities/projects']().where('client_id', this.selections.client).orderBy('id', 'desc').get()
      },
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
            let projectsTable = that.$refs.projectsTable
            let rowData = projectsTable.table.getDataAtRow(r)
            this.$store.commit('global/setSelectedProject', rowData[0])
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
              editor: false,
            },
            {
              data: 'status',
              type: 'text',
              editor: false,              
            },
            {
              data: 'description',
              type: 'text',
              editor: false,
            },
          ],
          colHeaders: [
            'id',
            'Project Name',
            'Status',
            'Description'
          ],
          height: 200,
        },
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
