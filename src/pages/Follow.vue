<template>
  <div>
    <hm-header>我的关注</hm-header>
    <div class="nav" v-for="item in list" :key="item.id">
      <div class="left">
        <img :src="$axios.defaults.baseURL + item.head_img" alt="" />
      </div>
      <div class="center">
        <span>{{ item.nickname }}</span>
        <div class="time">{{ item.create_date | date }}</div>
      </div>
      <div class="right">
        <div class="btn" @click="unfollow(item.id)">取消关注</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 关注列表
      list: []
    }
  },

  created() {
    this.getList()
  },
  methods: {
    async getList() {
      // 发送请求用户关注列表
      const res = await this.$axios({
        method: 'get',
        url: '/user_follows'
      })
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode == 200) {
        this.list = data
      }
    },
    async unfollow(id) {
      // vant-ui做弹出框
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '是否取关该博主'
        })
        const res = await this.$axios({
          method: 'get',
          url: `/user_unfollow/${id}`
        })
        const { statusCode, message } = res.data
        if (statusCode === 200) {
          // 提示消息
          this.$toast.success(message)
          // 重新渲染
          this.getList()
        }
      } catch (error) {
        this.$toast('操作已取消')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.nav {
  display: flex;
  height: 80px;
  border-bottom: 2px solid #ccc;
  padding: 0 20px;
  align-items: center;
  .left {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .center {
    flex: 1;
    margin-left: 10px;
    span {
      font-size: 14px;
    }
    .time {
      font-size: 10px;
      color: #666;
    }
  }
  .right {
    width: 70px;
    height: 26px;
    line-height: 26px;
    border-radius: 10px;
    text-align: center;
    background-color: #ddd;
    font-weight: bold;
  }
}
</style>
