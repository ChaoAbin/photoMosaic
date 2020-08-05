<template>
  <div>
    <h2>原始圖片:</h2>  
    <img ref="img" />
    <h2>壓縮成寬度{{width}}px:</h2>
    <canvas ref="ctx" />
    <h2>放大壓縮圖的色塊並嵌入隨機圖片(馬賽克:{{mosaicWidth}}px)</h2>
    <template v-for="(row) in rgbaList">
      <!--eslint-disable-next-line-->
      <div class="row" :style="'height: ' + mosaicWidth + 'px;'">
        <template v-for="(col) in row">
          <!--eslint-disable-next-line-->
          <div class="cell" :style="'width: ' + mosaicWidth + 'px;'">
            <div class="block-color" :style="'background-color: ' + col + ';'"></div>
            <img class="block-img" :src="getRandomImg()" />
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
import Compressor from 'compressorjs';
import FileTransform from '../utils/FileTransform'

/*
image 各種型態轉換(blob, dataURL, canvas) in JavaScript
Ref: https://chiayilai.com/image-各種型態轉換blob-dataurl-canvas-in-javascript/
*/

export default {
  name: 'Compressor',
  props: {
    width: Number,
    mosaicWidth: Number
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
    drawImage(url) {
      console.log('ctx: ', this.$refs.ctx)
      let img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
          let dataURL, canvas = this.$refs.ctx,
          ctx = this.$refs.ctx.getContext('2d')
          canvas.height = img.height;
          canvas.width = img.width;
          ctx.drawImage(img, 0, 0);
          let imgData = ctx.getImageData(0, 0, img.width, img.height).data;
          this.enlarge(imgData)
      };
      img.src = url;
    },
    enlarge(imgData) {
      let rgba = []
      let x = -1
      for(let i=0;i<imgData.length;i=i+4) {
        if(x === -1 || rgba[x].length % this.width === 0) {
          rgba.push([])
          x++
        }
        rgba[x].push('rgba(' + imgData[i] + ','+ imgData[i+1] + ',' + imgData[i+2] + ',' + imgData[i+3]/255 + ')')
      }
      this.rgbaList = rgba
      console.log('imgData: ', imgData, imgData.length, this.rgbaList)
    },
    getRandomImg(maxNumber) {
      let imageList = []
      for(let i=1;i<14;i++) {
        imageList.push(require("@/assets/random/"+i+".jpg"))
      }
      return imageList[(Math.floor(Math.random() * Math.floor(13)))]
    },
    exampleCompressor(imgSrc) {
      FileTransform.convertImgToBase64URL(imgSrc)
      .then((b64) => {
        let file = FileTransform.dataURLtoFile(b64)
        return this._compressorImage(file, {
          // quality: 0.1,
          // convertSize: 50000,
          width: this.width
        })
      })
      .then(FileTransform.blobtoDataURL)
      .then((b64) => {
        this.drawImage(b64)
      })
      .catch((err) => {
        console.log('err: ', err)
      })
    },
    /**
    * use compressor
    * @param  {File or Blob Object} files
    * @param  {Object} opts compressor.js options
    * @Ref compressor.js: https://github.com/fengyuanchen/compressorjs
    * @return {Promise Object} compressor.js success result
    */
    _compressorImage(file, opts) {
      return new Promise((resolve, reject) => {
        opts['success'] = (r) => {
          resolve(r)
        }
        opts['error'] = (err) => {
          reject(err)
        }
        new Compressor(file, opts);
      })
    }
  },
  mounted() {
    let imgSrc = require("@/assets/2017.10.03_0108.jpg")
    this.$refs.img.src = imgSrc
    this.exampleCompressor(imgSrc)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row {
}
.block-color {
  position: absolute;
  display: inline-block;
  width: 100%;
  height: 100%;
  opacity: 0.7;
}
.block-img {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.3;
}
.cell {
  position: relative;
  display: inline-block;
  height: 100%;
}
</style>
