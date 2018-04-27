<template lang="pug">
  #app
    //- #nav
      router-link(to="/") Home
      router-link(to="/about") About
    router-view
</template>

<style lang="stylus">
  #app
    font-size 14px
    line-height 1.5
    height 100%
    background-color #fff
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    color #2c3e50
    #nav
      background #eee
      line-height 2
      a
        padding 1em
    .columns
      max-width 100%
</style>
