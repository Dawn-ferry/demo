<template>
  <div class="home">
    <header>
      <div class="left">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="center" @click="$router.push('/search')">
        <span class="iconfont iconsearch"></span>
        <span>搜索新闻</span>
      </div>
      <div class="right" @click="$router.push('/user')">
        <span class="iconfont iconwode"></span>
      </div>
    </header>
    <!-- 
      粘性布局
      通过sticky属性可以开启粘性布局，粘性布局下，当 Tab 滚动到顶部时会自动吸顶
      切换动画
      通过animated属性可以开启切换标签内容时的转场动画
      滑动切换
      通过swipeable属性可以开启滑动切换标签页
    -->
    <van-tabs v-model="active" swipeable sticky animated>
      <van-tab v-for="item in tabList" :key="item.id" :title="item.name">
        <!-- 分页 -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
          :offset="50"
        >
          <hm-post v-for="post in list" :key="post.id" :zpost="post"></hm-post>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  // 给组件起个名字，用于缓存该组件
  name: "home",
  data() {
    return {
      // 激活tab下标
      active: 0,
      // 储存tab栏的数据
      tabList: [],
      list: [],
      // 文章的分页
      pageIndex: 1,
      pageSize: 5,
      // 组件的加载状态
      loading: false,
      // 是否还有更多数据
      finished: false
    };
  },
  destroyed() {
    console.log("home组件销毁了");
  },
  async created() {
    console.log("home组件创建了");
    // 使用缓存获取tab的数据;
    const list = JSON.parse(localStorage.getItem("list"));
    if (list) {
      this.tabList = list;
      this.getPostList(this.tabList[this.active].id);
      return;
    }
    // 获取栏目列表
    const res = await this.$axios({
      method: "get",
      url: "/category"
    });
    const { statusCode, data } = res.data;
    if (statusCode === 200) {
      // 将tab的数据赋值给tabList
      this.tabList = data;
      this.getPostList(this.tabList[this.active].id);
    }
  },
  methods: {
    async getPostList(id) {
      console.log("sa", id);

      const res = await this.$axios({
        method: "get",
        url: "/post",
        params: {
          category: id,
          // 带上请求分页的参数
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      });
      const { statusCode, data } = res.data;
      // this.list = data;
      this.list = [...this.list, ...data];
      console.log(this.list);
      // 数据加载完成，需要将onload
      this.loading = false;
      // 加载的数据小于所需要的数据
      if (data.length < this.pageSize) {
        this.finished = true;
      }
    },
    onLoad() {
      console.log("上拉加载");
      // this.pageIndex++;
      const id = this.tabList[this.active].id;

      setTimeout(() => {
        this.pageIndex++;
        this.getPostList(id);
      }, 1000);
    }
  },
  // 使用监听属性，监听active的变化,重新获取文章的数据
  watch: {
    // 当active下标变化时，运行
    active(value) {
      // console.log(value);
      //当tab切换时，初始化所有的数据
      this.pageIndex = 0;
      this.list = [];
      this.finished = false;
      //当tab切换时,此时不会触发load事件，也就是不加载数据
      this.loading = true;
      this.onLoad();
      // const id = this.tabList[value].id;
      // this.getPostList(id);
    }
  }
};
</script>

<style lang="less" scoped>
header {
  display: flex;
  align-items: center;
  background-color: red;
  color: white;
  .left {
    width: 50px;
    .iconnew {
      font-size: 50px;
    }
  }
  .center {
    flex: 1;
    text-align: center;
    height: 30px;
    line-height: 30px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 15px;
    .iconsearch {
      padding: 5px;
    }
    span {
      font-size: 14px;
    }
  }
  .right {
    width: 40px;
    text-align: center;
    .iconwode {
      font-size: 24px;
    }
  }
}
// 深度选择器
/* 
scoped的原理，在style中添加scoped
1.会给当前组件样式的选择器一个额外的属性选择器
2.会给当前组件的模板所有标签添加一个 额外的属性选择器

深度选择器：
保证了样式在子组件也能生效
在css中   >>>
在less中  /deep/
在scss中  ::v-deep
*/
/deep/.van-tabs__nav {
  background-color: #ccc;
}
</style>
