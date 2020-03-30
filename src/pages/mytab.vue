<template>
  <div class="mytabs">
    <hm-header>我的栏目</hm-header>
    <div class="tabs-content">
      <div class="del">点击删除以下频道</div>
      <div class="content">
        <div class="item" v-for="item in list" :key="item.id" @click="del(item.id)">{{item.name}}</div>
      </div>
    </div>
    <div class="tabs-content">
      <div class="del">点击添加以下频道</div>
      <div class="content">
        <div class="item" v-for="item in delist" :key="item.id" @click="add(item.id)">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      delist: []
    };
  },
  async created() {
    const list = JSON.parse(localStorage.getItem("list"));
    const delist = JSON.parse(localStorage.getItem("delist"));
    if (list && delist) {
      this.list = list;
      this.delist = delist;
      return;
    }
    const res = await this.$axios.get("/category");
    const { statusCode, data } = res.data;
    if (statusCode === 200) {
      this.list = data;
      // console.log(this.list);
    }
  },
  methods: {
    del(id) {
      // console.log(id);
      // 至少保留3个栏目
      if (this.list.length < 4) {
        this.$toast("至少保留3个栏目");
        return;
      }
      const idx = this.list.findIndex(item => item.id === id);
      // console.log(idx);
      // 先添加在删除，否则无法添加
      this.delist.push(this.list[idx]);
      // //删除
      this.list.splice(idx, 1);
    },
    add(id) {
      // console.log(id);
      const idx = this.delist.findIndex(item => item.id === id);
      // console.log(idx);
      // 先添加在删除，否则无法添加
      this.list.push(this.delist[idx]);
      // //删除
      this.delist.splice(idx, 1);
    }
  },
  /* 
    出现的问题：虽然可以上下添加删除，但是页面一刷新就回归原始
    解决：
    通过监听栏目的变化，设置一个缓存从缓存中那数据
    
  */
  watch: {
    // 在监听属性中监听栏目的变化
    list: {
      // 深度监听
      deep: true,
      handler(value) {
        // console.log(value);
        // 通过缓存存储数据
        localStorage.setItem("list", JSON.stringify(this.list));
        localStorage.setItem("delist", JSON.stringify(this.delist));
      }
    }
  }
};
</script>

<style lang="less" scoped>
.tabs-content {
  padding: 0 20px;
  .del {
    padding: 10px 0;
    font-size: 12px;
    color: #999;
  }
  .content {
    // display: flex
    overflow: hidden;
    .item {
      float: left;
      margin: 5px 5px;
      width: 20%;
      height: 30px;
      line-height: 30px;
      border: 1px solid #ccc;
      background-color: rgba(0, 0, 0, 0.5);
      text-align: center;
    }
  }
}
</style>