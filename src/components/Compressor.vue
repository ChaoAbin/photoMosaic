<template>
  <div>
    <img ref="img" />
    <img :src="b64" />
  </div>
</template>

<script>
import Compressor from 'compressorjs';

/*
image 各種型態轉換(blob, dataURL, canvas) in JavaScript
Ref: https://chiayilai.com/image-各種型態轉換blob-dataurl-canvas-in-javascript/


*/

export default {
  name: 'Compressor',
  props: {
    msg: String
  },
  data: function () {
    return {
      b64: ""
    }
  },
  methods: {
    /**
    * Convert an Base64Url
    * to File Object
    * @param  {String}   dataurl
    * @param  {String}   filename
    * @return {File Object} File Object
    * @Ref https://stackoverflow.com/questions/35940290/how-to-convert-base64-string-to-javascript-file-object-like-as-from-file-input-f
    */
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), 
          n = bstr.length, 
          u8arr = new Uint8Array(n);
          
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      
      return new File([u8arr], filename, {type:mime});
    },
    /**
    * Convert an image
    * to a base64 url
    * @param  {String}   url
    * @param  {Function} callback
    * @param  {String}   [outputFormat=image/png]
    */
    convertImgToBase64URL(url, callback, outputFormat) {
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function(){
            var canvas = document.createElement('CANVAS'),
            ctx = canvas.getContext('2d'), dataURL;
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img, 0, 0);
            dataURL = canvas.toDataURL(outputFormat);
            callback(dataURL);
            canvas = null; 
        };
        img.src = url;
    },
    /**
    * Convert an Blob
    * to a base64 url
    * @param  {Blob Object} blob
    * @param  {Function} callback
    */
    blobtoDataURL(blob, callback) {
        var fr = new FileReader();
        fr.onload = function(e) {
            callback(e.target.result);
        };
        fr.readAsDataURL(blob);
    },
    testCompressor() {
      this.convertImgToBase64URL(require("@/assets/WswRY9-1.jpg"), (dataURL) => {
        let f = this.dataURLtoFile(dataURL, "logo.png")
        new Compressor(f, {
          quality: 0.1,
          convertSize: 50000,
          success: (result) => {
            this.blobtoDataURL(result, (b64) => {
              this.b64 = b64
              console.log('b64: ', b64)
            })
          },
          error(err) {
            console.log(err);
          },
        });
      }, "image/png")
    }
  },
  mounted() {
    // this.$refs.img.src = require("@/assets/WswRY9-1.jpg")
    // this.testCompressor()
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
