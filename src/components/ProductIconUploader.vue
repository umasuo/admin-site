<template>
  <div class="eva-img-uploader">
    <img :src="curImg" class="eva-img-uploader__icon">

    <p class="text-danger" v-if="message === 'failed to read file'"><small>{{$t('product_definition.basic_info.load_fail')}}</small></p>
    <p class="text-danger" v-else-if="message === 'failed to upload'"><small>{{$t('product_definition.basic_info.upload_fail')}}</small></p>
    <p class="text-danger" v-else-if="message !== ''"><small>{{$t('product_definition.basic_info.unknow_error')}}</small></p>

    <div class="eva-img-uploader__input-wrapper">
      <span class="eva-img-uploader__button">{{$t('product_definition.basic_info.select_icon')}}</span>
      <input type="file" accept=".jpg,.jpeg,.png" @change="preview">
    </div>
  </div>
</template>

<script>
  import dataURLtoBlob from 'blueimp-canvas-to-blob'
  import api from 'src/api'

  export default {
    name: '',

    model: {
      prop: 'imgSrc'
    },

    props: ['imgSrc'],

    data () {
      return {
        curImg: this.imgSrc,

        message: ''
      }
    },

    methods: {
      preview (e) {
        const input = e.target
        const vm = this

        if (input.files && input.files[0]) {
          const reader = new FileReader()

          reader.onload = function (e) {
            const img = document.createElement('img')
            img.onload = async function (e) {
              const canvas = document.createElement('canvas')

              const size = 64
              canvas.width = size
              canvas.height = size
              const ctx = canvas.getContext('2d')
              ctx.drawImage(img, 0, 0, size, size)

              // TODO: I only display the scaled img here, to upload it as a file, check https://github.com/blueimp/JavaScript-Canvas-to-Blob.
              const dataUrl = canvas.toDataURL('image/jpg')
              vm.curImg = dataUrl
              const blob = dataURLtoBlob(dataUrl)

              try {
                const uploadedUrl = await api.files.uploadFile(blob)
                vm.$emit('input', uploadedUrl)
              } catch (e) {
                vm.message = 'failed to upload'
              }
            }
            img.src = e.target.result
          }

          reader.onerror = function (e) {
            vm.message = 'failed to read file'
          }

          reader.readAsDataURL(input.files[0])
        }
      }
    }
  }
</script>

<style lang="scss">
  .eva-img-uploader {
    $size: 64px;
    width: $size;
    // height: $size + 20px;

    &__icon {
      width: $size;
      height: $size;
    }

    &__input-wrapper {
      overflow: hidden;
      position: relative;
      height: 20px;
      text-align: center;
      cursor: pointer;
    }

    &__button {
      cursor: pointer;
    }

    input {
      display: block;
      position: absolute;
      width: $size;
      height: 100%;
      font-size: 100px;
      right: 0;
      top: 0;
      opacity: 0;
      cursor: pointer;
    }
  }
</style>
