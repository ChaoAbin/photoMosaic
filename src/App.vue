<template>
  <div id="app">
    <Compressor :width="100" :mosaicWidth="5" />
    <MaskPhoto :width="50" />
  </div>
</template>

<script>
import Compressor from './components/Compressor.vue'
import MaskPhoto from './components/MaskPhoto.vue'

export default {
  name: 'App',
  components: {
    Compressor,
    MaskPhoto
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  margin-bottom: 60px;
  width: 2000px;
}
</style>
