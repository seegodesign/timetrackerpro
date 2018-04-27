<template lang="pug">
  .page-home(@mousemove="mouseMove" @mouseup="mouseUp")
    nav.navbar.has-shadow
      .navbar-brand
        h1.title My Dashboard
        span(v-for="(location, idx) in locations" :key="idx") {{ location.name }}
      .navbar-menu
        .navbar-end
          //- .navbar-item.has-dropdown.is-active
          .navbar-item.has-dropdown
            a.navbar-link
              | Account
            .navbar-dropdown
              a.navbar-item
                | Dashboard
              a.navbar-item
                | Profile
              a.navbar-item
                | Settings
              hr.navbar-divider
              .navbar-item
                | Logout
    .main-layout.columns
      aside.column.aside
        clients
      .column.projects-and-lineitems
        projects
        hr.resize-panels(@mousedown.prevent='resizePanels')
        lineitems

</template>

<style lang="stylus">
  $gray = #dedede
  $lightgray = #fafafa
  $lightblue = #ebfaff

  hr.resize-panels
    cursor ns-resize
    margin 20px 0
    height 4px
    background #eee
    flex-shrink 0

  .navbar-brand
    .title 
      padding 1rem
  .main-layout
    margin-top 0
    .aside, .projects-and-lineitems
      padding 0
      height calc(100vh - 68px)
    .aside
      display block
      flex-shrink 0
      flex-basis 200px
      background-color #F9F9F9
      border-right 1px solid $gray
      padding 1rem 2rem
      margin 0 -1px 0
      .subtitle
        margin-bottom 1rem
    .projects-and-lineitems
      flex 1
      flex-grow 10
      justify-content flex-start
      display flex
      flex-direction column
  .handsontable
    overflow-y auto
    .htNumeric
      text-align left !important
    .htBorders
      display none !important
    .currentRow, .highlight
      background-color $lightblue !important
    tr
      cursor pointer
      &:hover td
        background $lightgray 
    th:first-child, td:first-child
      opacity 0
    th:nth-child(2), td:nth-child(2)
      border-left solid 1px $gray !important
    th
      text-align left
    td
      border-right none
      &:last-child
        border-right solid 1px $gray
  .autocompleteEditor th, .autocompleteEditor td
    opacity 1 !important
</style>

<script>
  import $ from 'jquery'
  import data from '../data'
  import store from '../store'
  import Clients from '../components/Clients'
  import Projects from '../components/Projects'
  import LineItems from '../components/LineItems'
  import { debounce } from '../helpers'
  import { mapGetters } from 'vuex'
  import EventBus from '../event-bus.js'  

  export default {
    store,

    name: 'Home',
    created(){
      const initialData = data
      // Create projects with fake data
      this.$store.dispatch('entities/projects/create', { data: initialData })
    },
    computed: {
      ...mapGetters({
        isResizing: 'global/isResizing',
        lastDownY: 'global/lastDownY',
      })
    },
    methods: {
      mouseUp(){
        this.$store.commit('global/setIsResizing', false)
      },
      mouseMove(e){
        if (this.$store.state.global.isResizing) EventBus.$emit('VERTICAL_DRAG', e)
      },
      resizePanels(e){
        this.$store.commit('global/setIsResizing', true)
        this.$store.commit('global/setLastDownY', e.clientY)
      },
    },
    components: {
      'clients': Clients,
      'projects': Projects,
      'lineitems': LineItems,
    }
  }
</script>
