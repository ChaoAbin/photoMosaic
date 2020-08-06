<template>
  <div>
    <h2>遮色片效果:</h2>
    <div style="position: relative; width: 700px;">
      <img class="photo" ref="img2" />
      <div class="container">
        <img class="item" :key="n" v-for="n in 200" :src="getRandomImg()" :style="'width: ' + width + 'px;'"/>
      </div>
    </div>
  </div>
</template>

<script>
import Compressor from 'compressorjs';
import ImageFormat from '../utils/ImageFormat'

/*
image 各種型態轉換(blob, dataURL, canvas) in JavaScript
Ref: https://chiayilai.com/image-各種型態轉換blob-dataurl-canvas-in-javascript/
*/

export default {
  name: 'MaskPhoto',
  props: {
    width: Number
  },
  data: function () {
    return {
      b64: "",
      rgbaList: []
    }
  },
  computed: {
  },
  methods: {
    getRandomImg(maxNumber) {
      let imageList = []
      for(let i=1;i<14;i++) {
        imageList.push(require("@/assets/random/"+i+".jpg"))
      }
      return imageList[(Math.floor(Math.random() * Math.floor(13)))]
    }
  },
  mounted() {
    let imgSrc = require("@/assets/2017.10.03_0108.jpg")
    this.$refs.img2.src = imgSrc
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.photo {
    position: relative;
    width: 100%;
}
.container {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  display: flex;
  overflow: hidden;
}
.container .item {
  height: auto;
  opacity: 0.25;
}
</style>
