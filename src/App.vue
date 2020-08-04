<template>
  <div id="app">
    <Compressor />
  </div>
</template>

<script>
import Compressor from './components/Compressor.vue'
import Canvas from './components/Canvas.vue'

export default {
  name: 'App',
  components: {
    Compressor,
    Canvas
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
