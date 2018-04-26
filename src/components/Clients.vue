<template lang="pug">
  .clients-wrap
    h2.subtitle Clients
    .clients
      a(:class='{ item: true, active: selections.client === client.id }' href='#' @click.prevent='selections.client = client.id' v-for='(client, index) in clients' v-bind:id='client.id')
        span.name {{ client.name }}
    .clients-actions
      a.button.is-primary.is-block.is-bold
        span.compose Add New Client
</template>

<script>
  import store from '../store'
  import { mapGetters } from 'vuex'

  export default {
    store,

    name: 'Clients',
    computed: {
      ...mapGetters({
        selections: 'global/selections',
      }),
      clients(){
        return this.$store.getters['entities/clients']().orderBy('id', 'desc').get()
      },
    },
  }
</script>

<style scoped lang="stylus">

</style>
