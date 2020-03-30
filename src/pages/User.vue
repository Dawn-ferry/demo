<template>
  <div class="user">
    <hm-header>用户中心</hm-header>
    <div class="header" @click="$router.push('/edit')">
      <div class="left">
        <img :src="$axios.defaults.baseURL + info.head_img" alt="图片加载请稍后..." />
      </div>
      <div class="center">
        <div class="title">
          <span v-if="info.gender === 1" class="iconfont iconxingbienan"></span>
          <span v-else class="iconfont iconxingbienv"></span>
          <span>{{ info.nickname }}</span>
        </div>
        <div class="time">{{ info.create_date | date }}</div>
      </div>
      <div class="right">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <hm-navbar title="我的关注" content="关注的用户" @click="$router.push('/follow')"></hm-navbar>
    <hm-navbar title="我的跟帖" content="跟帖/回复" @click="$router.push('/comment')"></hm-navbar>
    <hm-navbar title="我的收藏" content="文章/视频" @click="$router.push('/star')"></hm-navbar>
    <hm-navbar title="栏目设置" @click="$router.push('/mytab')"></hm-navbar>
    <hm-navbar title="设置" @click="$router.push('/edit')"></hm-navbar>
    <hm-navbar title="去首页" @click="$router.push('/')"></hm-navbar>
    <hm-navbar title="退出" @click="logout"></hm-navbar>
  </div>
</template>

<script>
export default {
  //存放个人信息
  data() {
    return {
      // 存放个人信息
      info: {}
    };
  },
  async created() {
    // 发送请求之前，获取个人信息
    // 必须发请求，携带token,token 需要一个请求头Authorization
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");
    // 发送 请求
    const res = await this.$axios({
      method: "get",
      url: `/user/${user_id}`,
      // 配置请求头
      headers: {
        Authorization: token
      }
    });
    const { statusCode, data } = res.data;
    if (statusCode === 200) {
      this.info = data;
      console.log(this.info);
    }
  },
  methods: {
    async logout() {
      try {
        await this.$dialog.confirm({
          title: "温馨提示",
          message: "你确定要退出吗？"
        });
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        this.$router.push("/login");
        this.$toast.success("退出成功");
      } catch (error) {
        this.$toast("取消退出");
      }
    }
  }

  //   beforeCreate() {
  //     document.querySelector("body").setAttribute("style", "background:skyblue");
  //   }
};
</script>
<style lang="less" scoped>
.user {
  height: 100%;
  background-color: #f2f2f2;
}
.header {
  display: flex;
  height: 100px;
  padding: 0px 20px;
  align-items: center;
  border-bottom: 5px solid #ccc;
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
  .center {
    flex: 1;
    font-size: 12px;

    .title {
      .iconxingbienan {
        color: blue;
      }
      .iconxingbienv {
        color: pink;
      }
      span {
        margin: 0 5px;
      }
    }
    .time {
      margin: 5px 8px;
      color: #ccc;
    }
  }
  .right {
    width: 30px;
    span {
      font-size: 24px;
    }
  }
}
</style>
