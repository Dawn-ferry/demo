<template>
  <div class="wraper">
    <!-- 
      递归的组件 
      在递归出现的问题，深层的评论无法回复。
      解决：使用递归的组件 ，给这个递归的组价注册事件
      :pinglun="pinglun.parent"父组件将评论列表数据传递给子组件
      :count="count-1"楼层数
      @hufu="hufu"， 【子传父】父组件给子组件提供函数；    如何触发/传递数据： 子组件通过自定义事件触发并携带参数
      该递归组件复用了父组件中的函数【子组件提供一个函数给父组件@hufu="hufu"，
      触发自定义事件由父组件方法触发】
      
    -->
    <hm-floor v-if="pinglun.parent" :pinglun="pinglun.parent" :count="count-1" @reply="hufu"></hm-floor>

    <div class="hm-floor">
      <div class="header">
        <div class="left">F{{count}}</div>
        <div class="center">
          <span>{{pinglun.user.nickname}}</span>
        </div>
        <div class="right">
          <!--触发点击事件-->
          <div class="right" @click="hufu(pinglun.id,pinglun.user.nickname)">回复</div>
        </div>
      </div>
      <div class="content">{{pinglun.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  // 如果想要在组价中调用自己组件，就需要给个名字
  name: "hm-floor",
  // 接受父组价的数据，pinglun列表，count楼层数
  props: {
    pinglun: Object,
    count: Number
  },
  methods: {
    //这里 接受的数据 是递归楼层组件的数据
    hufu(id, name) {
      console.log("floor接受的", id, name);
      // 注册一个，自定义，事件就是父组件提供给子组件一个函数，并携带参数传递给评论组件
      this.$emit("reply", id, name);
    }
  }
};
</script>

<style lang="less" scoped>
.hm-floor {
  background-color: #ddd;
  border: 1px solid #ccc;
  margin: 0 20px;
  padding: 10px;
  word-break: break-all;
}

.header {
  display: flex;
  .left {
    display: flex;
    align-items: center;
    padding-top: 3px;
    font-size: 10px;
  }
  .center {
    flex: 1;
    font-size: 14px;
    padding: 0 10px;
  }
  // .right {
  // }
}
.content {
  font-size: 14px;
  padding: 10px 0;
}
</style>