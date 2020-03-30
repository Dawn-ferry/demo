<template>
  <div class="post-detail">
    <meta name="referrer" content="never" />
    <header>
      <div class="left" @click="$router.back()">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="right">
        <div class="ungz" v-if="detail.has_follow" @click="unfollow(detail.user.id)">已关注</div>
        <div class="gz" v-else @click="follow(detail.user.id)">关注</div>
      </div>
    </header>
    <div class="detail-content">
      <div class="title">
        <div class="title-content">{{detail.title}}</div>
        <div class="time">
          {{detail.user.nickname}}
          <span>{{detail.create_date |date}}</span>
        </div>
      </div>
      <!-- 文章类 -->
      <div class="content" v-html="detail.content" v-if="detail.type===1"></div>
      <!-- 视频类 -->
      <video class="content" :src="detail.content" v-else controls></video>
    </div>
    <div class="bottom">
      <!-- 点赞区   :class="{active: detail.has_like}"点赞变成红色的样式 -->
      <div class="dz" @click="like" :class="{active: detail.has_like}">
        <span class="iconfont icondianzan">
          <!-- 点赞的数量 -->
          <b>{{detail.like_length || 0}}</b>
        </span>
      </div>
      <div class="wx">
        <span class="iconfont iconweixin">
          <b>微信</b>
        </span>
      </div>
    </div>
    <!-- 底部评论区域 -->
    <div class="comment">
      <div class="title">精彩评论</div>
      <!-- 评论列表封装成组件 -->
      <hm-pinglun v-for="item in pinglun" :key="item.id" :pinglun="item" @hufu="reply"></hm-pinglun>
    </div>
    <!-- 有关底部的输入框 -->
    <div class="footer">
      <!--显示input框  -->
      <div class="input" v-if="isShow">
        <input type="text" placeholder="请回复" @focus="handlef" />
        <span class="iconfont iconpinglun-">
          <b>{{detail.comment_length}}</b>
        </span>
        <span class="iconfont iconshoucang" :class="{active:detail.has_star}" @click="star"></span>
        <span class="iconfont iconfenxiang"></span>
      </div>
      <!--显示文本域的输入框用于输入内容  -->
      <div class="textarea" v-else>
        <textarea :placeholder="`回复：${this.nickname}`" @blur="handleb" ref="text" v-model="content"></textarea>
        <div class="send" @click="addComment">发送</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 将请求来的文章数据赋值给它
      detail: {
        user: {}
      },
      // 双向绑定评论的内容
      content: "",
      // 是否展示输入框，true展示input框不用输入内容
      isShow: true,
      //将请求获取的评论列表数据赋值给它
      pinglun: [],
      //获取 回复评论楼层的id和name
      replyId: "",
      nickname: ""
    };
  },
  destroyed() {
    console.log("详情页组件销毁了");
  },
  created() {
    //
    console.log("详情页组件创建了");

    // 一来就要加载数据的都放在created钩子函数里
    // 需要重复调用，封装成一个方法
    this.getDetail();
    this.getpinglun();
  },
  methods: {
    // 获取文章数据
    async getDetail() {
      // 获取文章详情通过id,id在地址栏通过get请求通过params拿
      const id = this.$route.params.id;
      const res = await this.$axios({
        method: "get",
        url: `/post/${id}`
      });
      const { statusCode, data } = res.data;
      if (statusCode === 200) {
        // console.log(data);
        this.detail = data;
      }
    },
    // 获取评论数据
    async getpinglun() {
      const id = this.$route.params.id;
      const res = await this.$axios.get(`/post_comment/${id}`);
      const { statusCode, data } = res.data;
      if (statusCode === 200) {
        this.pinglun = data;
        // console.log("pingl", this.pinglun);
      }
    },
    // 关注这，没登录之前都显示关注
    async follow(id) {
      // 判断是否登录
      const token = localStorage.getItem("token");
      if (!token) {
        this.$router.push({
          name: "login",
          // 传递一个值，登录后返回当前页
          params: { back: true }
        });
        this.$toast("您未登录,请登录");
        return;
      }
      //发送请求，简写
      const res = await this.$axios.get(`/user_follows/${id}`);
      const { statusCode } = res.data;
      if (statusCode == 200) {
        this.$toast.success("关注成功");
        // 重新渲染
        this.detail.has_follow = true;
      }
    },
    //取消关注
    async unfollow(id) {
      const res = await this.$axios.get(`/user_unfollow/${id}`);
      // console.log(res.data)
      const { statusCode } = res.data;
      if (statusCode === 200) {
        this.$toast.success("取关成功");
        // 关注成功，需要重新渲染
        this.getDetail();
        // this.detail.has_follow = false
      }
    },
    // 点赞和取消点赞功能
    async like() {
      const res = await this.$axios.get(`/post_like/${this.detail.id}`);
      // console.log(res.data);

      const { statusCode, message } = res.data;
      if (statusCode === 200) {
        this.$toast(message);
        // 重新渲染
        this.getDetail();
      }
    },
    // 收藏功能
    async star() {
      // 判断是否登录
      const token = localStorage.getItem("token");
      if (!token) {
        this.$router.push({
          name: "login",
          // 传递一个值，登录后返回当前页
          params: { back: true }
        });
        this.$toast("您未登录,请登录");
        return;
      }
      const res = await this.$axios.get(`/post_star/${this.detail.id}`);
      console.log(res.data);

      const { statusCode, message } = res.data;
      if (statusCode === 200) {
        this.$toast(message);
        // 重新渲染
        this.getDetail();
      }
    },
    // 获得焦点展示textarea
    handlef() {
      this.isShow = false;
      // 刚更新完数据，dom不会立即更新
      //解决nextTick等待dom更新完在操作
      this.$nextTick(() => {
        this.$refs.text.focus();
      });
    },
    // 失去焦点隐藏输入框展示input框
    handleb() {
      if (!this.content) {
        // 如果没有内容失去焦点时展示input框
        this.isShow = true;
        this.nickname = "";
        this.replyId = "";
      } else {
        // 有内容展示输入框
        this.isShow = false;
      }
    },
    // 父组件提供函数，并接受子组件传递的数据
    reply(id, name) {
      // console.log(id, name);
      // 存储id,name
      this.replyId = id;
      this.nickname = name;
      // 显示输入框textarea,一开始的是input的框
      this.isShow = false;
      // 等待dom的更新
      // 获取输入框的焦点
      this.$nextTick(() => {
        this.$refs.text.focus();
      });
    },
    // 发送评论功能
    async addComment() {
      // 发送请求
      const res = await this.$axios({
        method: "post",
        // 评论的文章的id
        url: `/post_comment/${this.detail.id}`,
        // 发送需要的数据
        data: {
          content: this.content,
          // id这个不是必须，用在回复某人的评论获取的他的id
          parent_id: this.replyId
        }
      });
      // console.log(res);
      const { statusCode } = res.data;
      if (statusCode == 200) {
        this.$toast.success("评论成功");
        // 重新渲染
        this.getpinglun();
        this.isShow = true;
        this.content = "";
        this.replyId = "";
        this.nickname = "";
      }
    }
  }
};
</script>
<style lang="less" scoped>
header {
  display: flex;
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid #ccc;
  align-items: center;
  padding: 10px 10px;
  .left {
    .iconjiantou2 {
      font-size: 26px;
    }
  }
  .center {
    flex: 1;
    .iconnew {
      line-height: 50px;
      font-size: 50px;
      margin-left: 10px;
    }
  }
  .right {
    .ungz,
    .gz {
      width: 70px;
      height: 28px;
      border: 1px solid #ccc;
      text-align: center;
      border-radius: 20px;
      font-weight: bold;
    }
    .ungz {
      background-color: red;
      color: white;
      border: none;
    }
  }
}

.detail-content {
  padding: 10px 20px;
  .title {
    height: 50px;
    .title-content {
      font-size: 18px;
      font-weight: bold;
    }
    .time {
      margin-top: 5px;
      color: #999;
    }
  }
  /deep/ img {
    width: 100%;
    display: block;
    margin-top: 20px;
  }
  /deep/ video {
    width: 100%;
    display: block;
    margin-top: 20px;
  }
  .content {
    font-size: 14px;
    word-break: break-all;
  }
}
.bottom {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  // 等同于&.active {
  // .dz.active {
  //   border-color: red;
  //   color: red;
  // }
  .dz {
    width: 60px;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 20px;
    text-align: center;
    // &.表示当前父元素
    &.active {
      border-color: red;
      color: red;
    }
    .icondianzan {
      b {
        margin: 5px;
        color: black;
        font-size: 12px;
      }
    }
  }
  .wx {
    width: 60px;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 10px;
    text-align: center;
    font-size: 20px;

    .iconweixin {
      color: green;
      b {
        margin: 5px;
        color: black;
        font-size: 12px;
      }
    }
  }
}
.comment {
  margin-bottom: 200px;
  // height: 200px;
  // border: 1px solid red;
}
.post-detail {
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    .input {
      display: flex;
      justify-content: space-between;
      padding: 10px 10px;
      border-top: 1px solid #ccc;

      input {
        width: 180px;
        height: 30px;
        border-radius: 20px;
        background-color: #ccc;
        border: none;
        outline: none;
        padding: 0px 10px;
      }
      .iconpinglun- {
        line-height: 30px;
        font-size: 23px;
        b {
          display: block;
          width: 40px;
          height: 16px;
          line-height: 16px;
          background-color: red;
          color: white;
          font-size: 10px;
          text-align: center;
          border-radius: 10px 10px 10px 0;
          margin-top: -30px;
          margin-left: 5px;
        }
      }
      .iconshoucang {
        line-height: 30px;
        font-size: 23px;
        &.active {
          color: red;
        }
      }

      .iconfenxiang {
        line-height: 30px;
        font-size: 23px;
      }
    }
    .textarea {
      display: flex;
      padding: 10px 16px;
      border-top: 1px solid #ccc;
      textarea {
        flex: 1;
        height: 60px;
        border-radius: 10px;
        padding: 10px;
        font-size: 12px;
        background-color: #ccc;
      }
      .send {
        width: 40px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        background-color: red;
        color: white;
        border-radius: 10px;
        margin-top: 60px;
        margin-left: 10px;
      }
    }
  }
}
.comment {
  .title {
    font-size: 20px;
    text-align: center;
    margin: 20px 0;
  }
}
</style>