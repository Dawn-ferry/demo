<template>
  <div class="test">
    <vue-cropper
      ref="cropper"
      img="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2829387590,2128721795&fm=26&gp=0.jpg "
      :outputSize="0.5"
      outputType="jpeg"
      :autoCrop="true"
      :info="true"
      :autoCropWidth="150"
      :autoCropHeight="150"
      :canMove="false"
    >
    </vue-cropper>
    <van-button class="crop" type="primary" @click="crop">裁剪</van-button>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  // 局部注册了头像裁剪插件
  components: {
    VueCropper
  },
  methods: {
    //
    crop() {
      //裁剪图片
      this.$refs.cropper.getCropBlob(data => {
        // data是图片的base64编码
        console.log(data)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.test {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.crop {
  position: absolute;
  bottom: 0;
}
</style>
