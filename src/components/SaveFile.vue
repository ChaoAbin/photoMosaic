<template>
  <div>
    <div @click="selectFile">
      選擇檔案
    </div>
    <template v-for="f in files">
      <!--eslint-disable-next-line-->
      <img class="block-img" :src="f" />
    </template>
    <br><br><br><br>
    <div @click="saveFile">
      儲存檔案
    </div>
  </div>
</template>

<script>

const { dialog } = window.require('electron').remote
const path = window.require('path')
const fs = window.require('fs')
console.log('electron: ', dialog, path, fs)

import ImageFormat from '../utils/ImageFormat'
import Compressor from 'compressorjs';

export default {
  name: 'SaveFile',
  props: {
    width: Number
  },
  data: function () {
    return {
      files: []
    }
  },
  computed: {
  },
  methods: {
    selectFile(e) {
        dialog.showOpenDialog({
            properties: ['openFile', 'multiSelections'],
            filters: [
              { name: 'Images', extensions: ['jpg', 'png', 'jpeg'] }
            ]
        })
        .then((r) => {
            if (!r.canceled) {
              let list = []
              for(let i=0;i<r.filePaths.length;i++) {
                let f = new File(
                  [fs.readFileSync(r.filePaths[i])],
                  i + "." + ImageFormat.getFileExtensions(r.filePaths[i]),
                  { type: ImageFormat.getFileTypeByExtensions(r.filePaths[i]) }
                )
                this._compressorImage(f, {
                    width: 100
                })
                .then((blob) => {
                  let fileReader = new FileReader();
                  fileReader.onload = function () {
                    fs.writeFileSync('img/' + blob.name, Buffer(new Uint8Array(this.result)));
                  };
                  fileReader.readAsArrayBuffer(blob);
                  console.log('blob: ', blob)
                  return ImageFormat.blobtoDataURL(blob)
                })
                .then((b64) => {
                  list.push(b64)
                })
                .catch((err) => {
                  console.log('err: ', err)
                })
              }
              this.files = list
            }
        })
        .catch((err) => {
            console.log('err: ', err)
        })
    },
    saveFile(e) {
      dialog.showSaveDialog({
      })
      .then((r) => {
        console.log('r: ', r)
        if (!r.canceled) {
          // r.filePath
          //save file
        }
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
