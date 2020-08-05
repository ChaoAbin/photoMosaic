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
  margin: 60px 20px;
  width: auto;
}
</style>
