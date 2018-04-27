<template lang="pug">
  .clients-wrap
    h2.subtitle Clients
    .clients
      .item(:class='{ active: selections.client === client.id }' href='#' @click='e => { nameClicked(e, client) }' v-for='(client, index) in clients' v-bind:id='client.id')
        span.name(v-if='client.name') {{ client.name }}
        input(v-if='!client.name' :value="client.name" placeholder="Client Name" @blur="e => { finishEdit(e, client) }" @keyup.enter="e => { finishEdit(e, client) }")
        .icon(@click.prevent="destroyClient(client.id)")
          trash.trash
      </button>
    .clients-actions
      .button.is-primary.is-block.is-bold(@click='addClient') New Client
</template>

<script>
  import store from '../store'
  import { mapGetters } from 'vuex'
  import Trash from './icons/Trash'

  export default {
    store,

    name: 'Clients',
    components: {
      'trash': Trash
    },
    computed: {
      ...mapGetters({
        selections: 'global/selections',
      }),
      clients(){
        return this.$store.getters['entities/clients']().orderBy('id', 'asc').get()
      },
    },
    data() {
      return {
        id: 4
      }
    },
    methods: {
      nameClicked(e, client){
        this.$store.commit('global/setSelectedClient', client.id)
        this.$store.commit('global/setSelectedProject', null)
      },
      finishEdit(e, client){
        this.updateClient(client.id, e.target.value)
      },
      addClient() {
        this.$store.dispatch('entities/clients/insert', {
          data: { id: '' }
        })
      },
      updateClient(id, name) {
        this.$store.dispatch('entities/clients/update', { id, name })
      },
      destroyClient(id) {
        if (confirm('Are you sure you want to do that?')) this.$store.dispatch('entities/clients/delete', id)
      }
    }
  }
</script>

<style scoped lang="stylus">
  $gray = #dedede
  $darkgray = #666
    
  .clients
    .item
      display block
      padding 0.5rem 2rem
      margin 0 -2rem
      cursor default
      position relative
      input
        font-size 0.8rem
        padding 0.5rem
        margin-right 1rem
        width 100%
      .icon
        display none
        color $darkgray !important
        width 16px
        height 16px
        position absolute 
        right 0.5rem
        top 50%
        transform translateY(-50%)
        cursor pointer
        &:hover
          color lighten($darkgray, 20%) !important
      &.active
        font-weight bold
      &:active, &:hover
        background-color $gray
      &.active
        background-color $gray
        .icon
          display none
      &:hover
        .icon
          display flex        
  .clients-actions
    margin-top 3rem
</style>
