<template>
  <div id="app">
      <CountryApi />
  </div>
</template>

<script>
import CountryApi from './components/CountryApi.vue'

export default {
  name: 'App',
  components: {
    CountryApi
}
}
</script>

<style>
body  {
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
}
</style>
