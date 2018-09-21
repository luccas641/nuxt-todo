<template>
  <section class="container">
    <todos></todos>
  </section>
</template>

<script>
  import Todos from '~/components/Todos.vue'

  export default {
    components: {
      Todos
    }
  }

</script>

<style>
  body {
    font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: normal;
    line-height: normal;
    line-height: 1.4em;
    background: #f5f5f5;
    color: #4d4d4d;
    min-width: 230px;
    max-width: 550px;
    margin: 0 auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 300;
  }

</style>
