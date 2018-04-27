<template lang="pug">
  .line-items(v-show='selections.project')
    .line-items__toolbar.columns
      .column
        h2.subtitle {{ projectName }} Line Items
      .column
        a.is-pulled-right(@click='addLineItem') + Add Line Item
    datatable(ref='lineItemsTable' :data='lineItems' :settings='dataTableSettings')
    .actions
      a.button.is-success(href='#' v-if='showStartTimer') Start Timer
      a.button.is-primary(href='#' @click='createInvoice') Create Invoice
</template>

<script>
  import $ from 'jquery'
  import store from '../store'
  import HotTable from '@handsontable/vue'
  import { mapGetters } from 'vuex'
  import { debounce, formatMoney } from '../helpers'
  import EventBus from '../event-bus.js'
  import jsPDF from 'jspdf'

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
      projectName(){
        let projectId = this.selections.project
        return projectId && this.$store.state.entities.projects.data[projectId] ? this.$store.state.entities.projects.data[projectId].name : ''
      },
      showStartTimer(){
        return this.selectionIsSingle
      },
      lineItems(){
        return this.$store.getters['entities/lineitems']().where('project_id', this.selections.project).orderBy('id', 'desc').get()
      }
    },
    mounted(){
      $(window).on('resize', debounce(this.redraw))

      EventBus.$on('VERTICAL_DRAG', function(){
        this.redraw()
      }.bind(this))
      this.redraw()
    },
    methods: {
      createInvoice(){
        let pdfName = 'test'; 
        var doc = new jsPDF();
        doc.text("Hello World", 10, 10);
        doc.save(pdfName + '.pdf');
      },
      addLineItem() {
        this.$store.dispatch('entities/lineitems/insert', {
          data: { 
            project_id: this.selections.project
          }
        })
      },
      update(id, payload) {
        this.$store.dispatch('entities/lineitems/update', { 
          where: id,
          data: payload
        })
      },
      destroy(id) {
        if (confirm('Are you sure you want to do that?')) this.$store.dispatch('entities/lineitems/delete', id)
      },
      redraw(){
        let ml = $('.main-layout').height(),
            ph = $('.projects').height()
        let tmpHeight = ml - ph - 180
        $('.line-items .handsontable').height(tmpHeight)
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
            this.$store.commit('global/setSelectedLineItems', rowData[0])            
          },
          afterChange: (changes, source) => {
            // Commit updates to data store after change
            if (changes){
              let rowNum = changes[0][0]
              let property = changes[0][1]
              let newVal = changes[0][3]
              let rowData = that.$refs.lineItemsTable.table.getDataAtRow(rowNum)
              let lineItemId = rowData[0]
              let payload = { id: lineItemId }
              payload[property] = newVal
              that.update(lineItemId, payload)
            }
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
            },
            {
              data: 'type',
              type: 'dropdown',
              source: ['hourly','fixed'],    
              renderer: function(instance, td, row, col, prop, value){
                let newVal = value.charAt(0).toUpperCase() + value.slice(1)
                td.innerHTML = newVal
              }
            },
            {
              data: 'qty',
              type: 'numeric',
              numericFormat: {
                pattern: '0,0.00',
                culture: 'en-US'
              },
            },
            {
              data: 'rate',
              type: 'numeric',
              numericFormat: {
                pattern: '$0,0.00',
                culture: 'en-US'
              },
              allowEmpty: false
            },
            {
              data: 'subtotal',
              renderer: function(instance, td, row, col, prop, value){
                let rowData = instance.getDataAtRow(row)
                let subtotal = rowData[3] * rowData[4]
                td.innerHTML = formatMoney(subtotal)
              },      
              editor: false,
            },
            {
              data: 'done',
              type: 'checkbox',
            },
          ],
          colHeaders: [
            'id',
            'Line Item',
            'Type',
            'Quantity (Hours)',
            'Rate (USD)',
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
  .line-items
    margin 0 10px 0
    .handsontable
      overflow hidden !important
    .actions 
      // border-top solid 1px $gray
      height 50px
      padding 5px 15px
      text-align right
      .button
        margin-left: 10px
</style>
