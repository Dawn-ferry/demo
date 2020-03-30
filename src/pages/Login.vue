<template>
  <div>
    <hm-header>登录</hm-header>
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
      type="password"
      placeholder="密码"
      v-model="password"
      :rule="/^1\d{1,10}$/"
      message="密码不正确，位数必须是1-10数字"
      ref="password"
    ></hm-input>
    <hm-button @click="login">登录</hm-button>
    <p class="go-Reg">
      没有账号？去
      <router-link to="/register">注册</router-link>
    </p>
  </div>
</template>
<script>
export default {
  methods: {
    async login() {
      const aa = this.$refs.username.validate(this.username);
      const bb = this.$refs.password.validate(this.password);
      if (!aa) {
        return;
      }
      if (!bb) {
        return;
      }

      const res = await this.$axios({
        method: "post",
        url: "/login",
        data: {
          username: this.username,
          password: this.password
        }
      });
      // console.log(res.data)
      let { statusCode, data, message } = res.data;
      if (res.data.statusCode === 200) {
        this.$toast.success(message);
        // 在跳转之前存储信息,登录保持
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_id", data.user.id);
        // 跳转，回跳
        if (this.$route.params.back) {
          this.$router.back();
        } else {
          this.$router.push("/user");
        }
      } else {
        this.$toast.success(message);
      }
    }
  },
  data() {
    return {
      username: "",
      password: ""
    };
  },
  // 在初始化数据之前拿注册的数据
  created() {
    console.log(this.$route);
    this.username = this.$route.params.username;
    this.password = this.$route.params.password;
  }
};
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
