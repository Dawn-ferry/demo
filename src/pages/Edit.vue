<template>
  <div>
    <hm-header>编辑资料</hm-header>
    <div class="photo">
      <img
        :src="$axios.defaults.baseURL + info.head_img"
        alt="图片加载请稍后..."
      />
      <!-- 上传头像的组件 -->
      <van-uploader
        class="uploader"
        :before-read="beforeRead"
        :after-read="afterRead"
      />
    </div>
    <hm-navbar
      title="眤称"
      :content="info.nickname"
      @click="showNickname"
    ></hm-navbar>
    <hm-navbar
      title="密码"
      :content="info.password.replace(/./g, '*')"
      @click="showPassword"
    ></hm-navbar>
    <hm-navbar
      title="性别"
      :content="info.gender === 1 ? '男' : '女'"
      @click="showGenger"
    ></hm-navbar>
    <!-- 弹出对话框 -->
    <van-dialog
      v-model="show"
      title="修改昵称"
      show-cancel-button
      @confirm="editNickname"
    >
      <van-field placeholder="请输入用户昵称" v-model="nickname" />
    </van-dialog>
    <!--修改密码  -->
    <van-dialog
      v-model="show1"
      title="修改密码"
      show-cancel-button
      @confirm="editPassword"
    >
      <van-field placeholder="请输入你的新密码" v-model="password2" />
    </van-dialog>
    <!-- 修改性别 -->
    <van-dialog
      v-model="show2"
      title="修改性别"
      show-cancel-button
      @confirm="editGender"
    >
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <van-radio slot="right-icon" :name="1" />
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <van-radio slot="right-icon" :name="0" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
    <!-- 遮罩层 -->
    <div class="cropper-mask" v-show="showCropper">
      <!-- 裁剪的图片 -->
      <vue-cropper
        ref="cropper"
        :img="img"
        :autoCrop="true"
        :autoCropWidth="150"
        :autoCropHeight="150"
        :fixed="true"
      ></vue-cropper>
      <van-button class="crop" type="primary" @click="crop">裁剪</van-button>
      <van-button class="cancel" type="info" @click="cancel">取消</van-button>
    </div>
  </div>
</template>

<script>
// 导入裁剪资源
import { VueCropper } from 'vue-cropper'
export default {
  // 局部注册了头像裁剪插件
  components: {
    VueCropper
  },
  //存放个人信息
  data() {
    return {
      // 存放个人信息
      info: {
        password: ' '
      },
      show: false,
      show1: false,
      show2: false,
      nickname: '',
      password2: '',
      gender: 1,
      // 遮罩层隐藏
      showCropper: false,
      img: ''
    }
  },
  created() {
    this.getinfo()
  },
  methods: {
    async getinfo() {
      // 发送请求
      const user_id = localStorage.getItem('user_id')
      const token = localStorage.getItem('token')
      // 发送请求
      const res = await this.$axios({
        method: 'get',
        url: `/user/${user_id}`,
        // 配置请求头
        headers: {
          Authorization: token
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.info = data
        console.log(this.info)
      }
    },
    // 显示修改昵称的对话框
    showNickname() {
      // 对话框显示
      this.show = true
      // 回显nickname
      this.nickname = this.info.nickname
    },
    showGenger() {
      this.show2 = true
      this.gender = this.info.gender
    },
    // 显示密码
    showPassword() {
      // 对话框显示
      this.show1 = true
      // 回显nickname
      this.password2 = this.info.password
    },
    // 将修改数据的方法封装，因为多次调用了
    async editUser(data) {
      const user_id = localStorage.getItem('user_id')
      const token = localStorage.getItem('token')
      const res = await this.$axios({
        method: 'post',
        url: `/user_update/${user_id}`,
        data
        // 每次都要携带标识麻烦，分装到全局请求拦截器中
        // headers: {
        //   Authorization: token
        // }
      })
      console.log(res.data)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        // 1. 重新渲染
        this.getinfo()
        // 2. 给一个成功的提示
        this.$toast.success(message)
      }
    },
    // 修改昵称方法
    editNickname() {
      this.editUser({
        nickname: this.nickname
      })
    },
    editPassword() {
      this.editUser({
        password: this.password2
      })
    },
    editGender() {
      this.editUser({
        gender: this.gender
      })
    },
    // 选中图片之后执行的回调函数，获取到对应的file对象
    afterRead(file) {
      // 显示遮罩层
      this.showCropper = true

      // 把上传的文件展现到遮罩层
      this.img = file.content
      // ajax通过formData异步上传文件
      // console.log(file)
      // console.log("当选择完文件了，这个函数就会执行", file.file);
      // 发送请求把文件上传到服务器上去
      // const fd = new FormData()
      // // "file"对应后台接口所需要的名字
      // fd.append('file', file.file)
      // this.$axios({
      //   method: 'post',
      //   url: '/upload',
      //   data: fd
      // }).then(res => {
      //   console.log(res.data)
      //   // 成功了，需要做什么？，修改用户图像
      //   const { statusCode, data } = res.data
      //   if (statusCode === 200) {
      //     // 能够拿到上传的图片的地址了，还需要修改掉用户的头像
      //     // 再次调用修改数据的方法，将需要的修改的数据传递
      //     this.editUser({
      //       head_img: data.url
      //     })
      //   }
      // })
    },
    // 选中图片之前调用的回调函数
    beforeRead(file) {
      //   // // 控制文件大小不能超过200k
      //   console.log('上传之前', file)
      //   if (file.size / 1024 >= 200) {
      //     this.$toast.fail('文件大小不能超过200kb')
      //     return false
      //   }
      //   // 控制文件的格式 必须是jpg
      //   if (file.type !== 'image/jpeg') {
      //     this.$toast.fail('上传的文件必须是jpg图片')
      //     return false
      //   }
      return true
    },
    //----------------- 图片裁剪的相关操作--------------
    // 裁剪
    crop() {
      // 获取截图的base64 数据
      // this.$refs.cropper.getCropData(data => {
      //   // do something
      //   console.log(data)
      // })
      // 裁剪图片以url形式展示
      this.$refs.cropper.getCropBlob(async data => {
        // console.log(data)
        const fd = new FormData()
        fd.append('file', data)
        // 把文件上传到服务器
        const res = await this.$axios({
          method: 'post',
          url: '/upload',
          data: fd
        })
        // 上传完之后做什么，修改
        // 调用修改数据的方法，修改头像
        const { statusCode, data: data1 } = res.data
        if (statusCode === 200) {
          // 能够拿到上传的图片的地址了，还需要修改掉用户的头像
          // 隐藏裁剪框
          this.showCropper = false
          // 把裁剪的图片地址清楚
          this.img = ''
          // 修改头像
          this.editUser({ head_img: data1.url })
        }
        // .then(res => {
        //   // 上传完之后做什么，
        //   // 调用修改数据的方法，修改头像
        //   const { statusCode, data } = res.data
        //   if (statusCode === 200) {
        //     // 能够拿到上传的图片的地址了，还需要修改掉用户的头像
        //     // 隐藏裁剪框
        //     this.showCropper = false
        //     // 把裁剪的图片地址清楚
        //     this.img = ''
        //     // 修改头像
        //     this.editUser({ head_img: data.url })
        //   }
        // })
      })
    },
    // 取消裁剪
    cancel() {
      this.showCropper = false
      this.img = ''
    }
  }
}
</script>

<style lang="less" scoped>
.photo {
  position: relative;
  display: flex;
  height: 100px;
  justify-content: center;
  align-items: center;
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
  .uploader {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
  }
  // 遮罩层样式
}
.cropper-mask {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 999;
  top: 0;
  left: 0;
  .crop,
  .cancel {
    position: absolute;
    top: 0;
  }
  .crop {
    left: 0;
  }
  .cancel {
    right: 0;
  }
}
</style>
