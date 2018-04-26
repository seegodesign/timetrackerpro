<template lang="pug">
  .line-items
    datatable(ref='lineItemsTable' :data='lineItems' :settings='dataTableSettings')
    .actions
      a.button.is-warning(href='#' v-if='showStartTimer') Start Timer
      a.button.is-primary(href='#') Send Invoice
</template>

<script>
  import $ from 'jquery'
  import store from '../store'
  import HotTable from '@handsontable/vue'
  import { debounce } from '../helpers'
  import { mapGetters } from 'vuex'

  export default {
    store,

    name: 'LineItems',
    components: {
      'datatable': HotTable      
    },
    computed: {
      ...mapGetters({
        selections: 'global/selections',
      }),
      showStartTimer(){
        return this.selectionIsSingle
      },
      lineItems(){
        return this.$store.getters['entities/lineitems']().where('project_id', this.selections.project).orderBy('id', 'desc').get()
      }
    },
    mounted(){
      let that = this
      $(window).on('resize', debounce(this.redraw))
      this.redraw()
    },
    methods: {
      redraw(){
        $('.line-items .handsontable').height($(window).height() - 300)
        if (this.$refs.lineItemsTable) this.$refs.lineItemsTable.table.render()  
      }
    },
    data(){
      let that = this
      return {
        selectionIsSingle: null,
        selectionIsSequential: null,
        dataTableSettings: {
          stretchH: 'all',
          manualColumnResize: true,
          multiSelect: false,
          disableVisualSelection: ['current', 'area'],
          currentRowClassName: 'currentRow',
          afterSelectionByProp: (r, c, r2, c2, preventScrolling, selectionLayerLevel) => {
            let isSeq = that.$refs.lineItemsTable.table.getSelected().length === 1
            that.selectionIsSequential = isSeq
            that.selectionIsSingle = isSeq && that.$refs.lineItemsTable.table.getSelectedRange()[0].from.row === that.$refs.lineItemsTable.table.getSelectedRange()[0].to.row
            let rowData = that.$refs.lineItemsTable.table.getDataAtRow(r)
            // that.selections.lineitem = rowData[0]
            this.$store.commit('global/setSelectedLineItems', rowData[0])            
          },
          afterDeselect: () => {
            that.selectionIsSequential = false
          },
          columns: [
            {
              data: 'id',
              type: 'numeric',
              width: 1,
              editor: false,
            },
            {
              data: 'description',
              type: 'text',
              editor: false,
            },
            {
              data: 'type',
              type: 'text',
              editor: false,              
            },
            {
              data: 'qty',
              type: 'text',
              editor: false,
            },
            {
              data: 'rate',
              type: 'text',
              editor: false,
            },
            {
              data: 'subtotal',
              type: 'text',
              editor: false,
            },
            {
              data: 'done',
              type: 'checkbox',
              editor: false,
            },
          ],
          colHeaders: [
            'id',
            'Line Item',
            'Type',
            'Quantity',
            'Rate',
            'Subtotal',
            'Done',
          ],
          // height: 400,
        },
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
