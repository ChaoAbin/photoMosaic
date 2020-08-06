/**
* Convert an Base64Url
* to File Object
* @param  {String}   dataurl
* @param  {String}   filename
* @return {File Object} File Object
* @Ref https://stackoverflow.com/questions/35940290/how-to-convert-base64-string-to-javascript-file-object-like-as-from-file-input-f
*/
const dataURLtoFile = function (dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);

    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, {type:mime});
}

/**
 * Convert an image
 * to a base64 url
 * @param  {String}   url image source path
 * @return {Promise Object} base64 url
 */
const convertImgToBase64URL = function (url) {
    let img = new Image()
    let outputFormat = getFileTypeByExtensions(url)
    img.crossOrigin = 'Anonymous'
    return new Promise((resolve) => {
        img.onload = function () {
            let canvas = document.createElement('CANVAS')
            let ctx = canvas.getContext('2d'), dataURL
            canvas.height = img.height
            canvas.width = img.width
            ctx.drawImage(img, 0, 0)
            dataURL = canvas.toDataURL(outputFormat)
            resolve(dataURL)
            canvas = null
        }
        img.src = url
    });
}

/**
 * Convert an Blob
 * to a base64 url
 * @param  {Blob Object} blob
 */
const blobtoDataURL = function (blob) {
    var fr = new FileReader()
    return new Promise((resolve) => {
        fr.onload = function(e) {
            resolve(e.target.result)
        };
        fr.readAsDataURL(blob)
    });
}

/**
 * get filename extensions
 * @param  {String} filename

 */
const getFileExtensions = function (filename) {
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : '';
}

/**
 * get filename extensions
 * @param  {String} filename
 * @param  {Function} callback
 */
const getFileTypeByExtensions = function (filename) {
    return (/[.]/.exec(filename)) ? 'image/' + /[^.]+$/.exec(filename) : 'image/*';
}

module.exports = {
    dataURLtoFile,
    convertImgToBase64URL,
    blobtoDataURL,
    getFileExtensions,
    getFileTypeByExtensions
}