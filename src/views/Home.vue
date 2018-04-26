<template lang="pug">
  .page-home
    nav.navbar.has-shadow
      .navbar-brand
        h1.title Time Tracker Pro
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
      aside.column.is-2.aside
        clients
      .column.projects-and-lineitems.is-10
        projects
        lineitems

</template>

<style lang="stylus">
  $gray = #dedede
  $lightgray = #fafafa
  $lightblue = #ebfaff

  html,body
    font-family 'Open Sans', serif
    font-size 14px
    line-height 1.5
    height 100%
    background-color #fff

  .navbar-brand
    .title 
      padding 1rem
  .main-layout
    margin-top 0
    .aside, .projects-and-lineitems
      padding 0
    .aside
      display block
      background-color #F9F9F9
      border-right 1px solid $gray
      padding 1rem 2rem
      margin 0 -1px 0
      .subtitle
        margin-bottom 1rem
      .clients
        .item
          display block
          padding 0.5rem 0
          &.active
            font-weight bold
          &:active, &:hover, &.active
            background-color $gray
            margin 0 -28px
            padding-left 28px
      .clients-actions
        margin-top 3rem
        // position absolute
        // bottom 2rem
    .projects-and-lineitems
      justify-content flex-start
      .projects
        margin 0 10px -1px
        padding 0
        border-bottom solid 1px $gray
      .line-items
        margin 0 10px 0
        .handsontable
          overflow hidden !important
        .actions 
          border-top solid 1px $gray
          height 50px
          padding 5px 15px
          text-align right
          .button
            margin-left: 10px
  .handsontable
    .htBorders
      display none !important
    .currentRow, .highlight
      background-color: $lightblue !important
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
</style>

<script>
  // @ is an alias to /src
  // import HelloWorld from '@/components/HelloWorld.vue'
  import $ from 'jquery'
  import data from '../data'
  import store from '../store'
  import Clients from '../components/Clients'
  import Projects from '../components/Projects'
  import LineItems from '../components/LineItems'

  export default {
    store,

    name: 'Home',
    created(){
      const initialData = data

      // Create projects with fake data
      this.$store.dispatch('entities/projects/create', { data: initialData })
    },
    components: {
      'clients': Clients,
      'projects': Projects,
      'lineitems': LineItems,
    },
  }
</script>
