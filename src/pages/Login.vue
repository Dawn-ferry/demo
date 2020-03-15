<template>
  <div>
    <hm-header>登录</hm-header>
    <hm-logo></hm-logo>

    <hm-input
      type="text"
      placeholder="用户名"
      v-model="username"
      :rule="/^1\d{4,10}$/"
      message="用户名格式不正确"
      ref="username"
    ></hm-input>
    <hm-input
      type="password"
      placeholder="密码"
      v-model="password"
      :rule="/^1\d{1,10}$/"
      message="密码不正确"
      ref="password"
    ></hm-input>
    <hm-button @click="login">登录</hm-button>
  </div>
</template>
<script>
export default {
  methods: {
    login() {
      const aa = this.$refs.username.validate(this.username)
      const bb = this.$refs.password.validate(this.password)
      // console.log(this.$refs.username)
      // console.log(aa, bb)
      if (!aa) {
        return
      }
      if (!bb) {
        return
      }
      this.$axios({
        method: 'post',
        url: '/login',
        data: {
          username: this.username,
          password: this.password
        }
      }).then(res => {
        console.log(res.data)
        if (res.data.statusCode === 200) {
          this.$toast.success(res.data.message)
          this.$router.push('/user')
        } else {
          this.$toast.success(res.data.message)
        }
      })
    }
  },
  data() {
    return {
      username: '',
      password: ''
    }
  }
}
</script>
<style></style>
