<template>
  <div id="app">
    <!--Compressor :width="100" :mosaicWidth="5" />
    <MaskPhoto :width="50" /-->
    <SaveFile />
  </div>
</template>

<script>
import Compressor from './components/Compressor.vue'
import MaskPhoto from './components/MaskPhoto.vue'
import SaveFile from './components/SaveFile.vue'

export default {
  name: 'App',
  components: {
    Compressor,
    MaskPhoto,
    SaveFile
  }
}
</script>

<style>
#app {
  margin: 60px 20px;
  width: auto;
}
</style>
