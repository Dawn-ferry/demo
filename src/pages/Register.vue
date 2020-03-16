<template>
  <div>
    <hm-header>注册</hm-header>
    <hm-logo></hm-logo>
    <hm-input
      type="text"
      placeholder="用户名"
      v-model="username"
      :rule="/^1\d{4,10}$/"
      message="用户名不正确，位数必须4-10数字"
      ref="username"
    ></hm-input>
    <hm-input
      type="text"
      placeholder="眤称"
      v-model="nickname"
      :rule="/^[\u4e00-\u9fa5]{3,7}$/"
      message="眤称不正确，必须是3-7的汉字"
      ref="nickname"
    ></hm-input>
    <hm-input
      type="password"
      placeholder="密码"
      v-model="password"
      :rule="/^1\d{1,10}$/"
      message="密码不正确，位数必须是1-10数字"
      ref="password"
    ></hm-input>
    <hm-button @click="register">注册</hm-button>
    <p class="go-Reg">
      已有账号？去
      <router-link to="/login">登录</router-link>
    </p>
  </div>
</template>
<script>
export default {
  methods: {
    register() {
      // 校验拦截，避免了重复的请求
      const aa = this.$refs.username.validate(this.username)
      const bb = this.$refs.password.validate(this.password)
      const cc = this.$refs.nickname.validate(this.nickname)
      if (!aa || !bb || !cc) {
        return
      }
      // 发送请求
      this.$axios({
        method: 'post',
        url: '/register',
        data: {
          username: this.username,
          nickname: this.nickname,
          password: this.password
        }
      }).then(res => {
        console.log(res.data)
        if (res.data.statusCode === 200) {
          this.$toast.success(res.data.message)
          this.$router.push({
            name: 'login',
            // 信息暴露
            // query: { username: this.username, password: this.password }
            // 使用params传递参数，必须使用命名路由
            params: { username: this.username, password: this.password }
          })
        } else {
          this.$toast.success(res.data.message)
        }
      })
    }
  },

  data() {
    return {
      username: '',
      nickname: '',
      password: ''
    }
  }
}
</script>
<style lang="less" scoped>
.go-Reg {
  font-size: 18px;
  text-align: center;
  color: #999;
  a {
    color: skyblue;
  }
}
</style>
