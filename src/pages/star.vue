<template>
  <div>
    <hm-header>我的收藏</hm-header>
    <hm-post v-for="post in list" :key="post.id" :zpost="post"></hm-post>
    <!-- <div class="nav" v-for="item in list" :key="item.id">
      <div class="main">
        <div class="content">{{ item.title }}</div>
        <div class="source">
          {{ item.nickname }} {{ item.comments.length }}跟帖
        </div>
      </div>
      <img :src="item.cover[0].url" alt="图片加载中请稍后..." />
    </div>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getStar();
  },
  methods: {
    async getStar() {
      const res = await this.$axios({
        method: "get",
        url: "/user_star"
      });
      console.log(res.data);
      const { statusCode, data } = res.data;
      if (statusCode === 200) {
        this.list = data;
        // 因为接口的问题hmpost里没有comment_length。
        // 解决：收藏的数据加上一个属性并赋值
        data.forEach(item => {
          item.comment_length = item.comments.length;
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
// .nav {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   height: 100px;
//   border-bottom: 1px solid #ddd;
//   padding: 0 10px;
//   // 解决图片的失真问题
//   img {
//     width: 120px;
//     height: 74px;
//     object-fit: cover;
//   }
//   .content {
//     font-size: 16px;
//     margin-bottom: 18px;
//   }
//   .source {
//     font-size: 10px;
//     color: #666;
//   }
// }
</style>
