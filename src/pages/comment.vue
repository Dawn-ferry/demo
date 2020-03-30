<template>
  <div>
    <hm-header>我的跟帖</hm-header>
    <!--  -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <div class="main" v-for="item in list" :key="item.id">
        <div class="left">
          <span class="time">{{ item.create_date }}</span>
        </div>
        <div class="commit" v-if="item.parent">
          <div class="name">回复:{{ item.parent.user.nickname }}</div>
          <div class="content">{{ item.parent.content }}</div>
        </div>
        <div class="center">
          <div>{{ item.content }}</div>
        </div>
        <div class="right" @click="$router.push(`/post-detail/${item.post.id}`)">
          <div class="title">{{ item.post.title }}</div>
          <span class="iconfont iconjiantou1"></span>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      pageIndex: 1,
      pageSize: 10
    };
  },
  created() {
    this.getcommitList();
  },
  methods: {
    async getcommitList() {
      // 发送请求获取跟帖有关内容
      const res = await this.$axios({
        method: "get",
        url: "/user_comments",
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      });
      // console.log(res)
      const { statusCode, data } = res.data;
      if (statusCode === 200) {
        // 追加数据
        this.list = [...this.list, ...data];
        console.log(this.list);

        //加载更多数据
        this.loading = false;
        // 返回的数据比每页的数据少
        if (data.length < this.pageSize) {
          this.finished = true;
        }
      }
    },
    onLoad() {
      console.log("我触底了，我要加载更多数据了");
      setTimeout(() => {
        this.pageIndex++;
        // 重新渲染
        this.getcommitList();
      }, 1000);
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  border-bottom: 2px solid #ccc;
  padding: 10px 20px;
  .left {
    .time {
      color: #999;
      font-size: 12px;
    }
  }

  .commit {
    background-color: #ccc;
    padding: 10px;
    .name {
      height: 30px;
      line-height: 30px;
      font-size: 10px;
      color: #666;
    }
    .content {
      font-size: 14px;
    }
  }
  .center {
    display: flex;
    flex: 1;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
  }
  .right {
    display: flex;
    font-size: 12px;
    color: #666;
    justify-content: space-between;
    span {
      color: #666;
    }
  }
}
</style>
