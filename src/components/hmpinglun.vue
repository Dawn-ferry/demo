<template>
  <!-- 评论组价是个全局组价 -->
  <div class="pinglun">
    <div class="main">
      <div class="hf">
        <div class="left">
          <img :src="$axios.defaults.baseURL+pinglun.user.head_img" alt />
        </div>
        <div class="center">
          <span>{{pinglun.user.nickname}}</span>
        </div>
        <div class="right" @click="hufu(pinglun.id,pinglun.user.nickname)">回复</div>
      </div>
      <!-- 
      <hm-floor>为封装的一个楼层组件，是显示在多人评论
        楼层的组件的说明
        pinglun.parent：为null时不显现楼层组件
        :pinglun传递数据有楼层的子组件接受
        :count传递楼层数
        @reply="hufu"父组件给子组件注册一个函数，一般子组价使用自定义事件触发
      -->
      <hm-floor
        v-if="pinglun.parent"
        :pinglun="pinglun.parent"
        :count="getcount(0,pinglun)"
        @reply="hufu"
      ></hm-floor>
      <!-- 评论的内容  -->
      <div class="content">{{pinglun.content}}</div>
      <!-- 评论的时间 -->
      <div class="time">{{pinglun.create_date |date2}}</div>
    </div>
  </div>
</template>

<script>
// 注册一个楼层的局部组件，因为该组件只会在评论里用，只需要注册一个局部组价即可
import HmFloor from "../components/hmfloor";
export default {
  // 接受父组件【文章数据渲染的组件】的数据
  props: ["pinglun"],
  //components用来注册局部楼层组价
  components: {
    HmFloor
  },
  methods: {
    //使用递归函数 计算楼层数
    getcount(num, obj) {
      if (obj.parent) {
        return this.getcount(num + 1, obj.parent);
      } else {
        return num;
      }
    },
    //点击回复接受当前id，为了弹出输入框
    hufu(id, name) {
      console.log("接受id", id, name);
      // 把id传给父组件
      this.$emit("hufu", id, name);
    }
  },
  created() {
    // console.log(this.pinglun);
  }
};
</script>

<style lang="less" scoped>
.main {
  margin: 0 15px;
  // padding: 0 10px;
  border-bottom: 1px solid #ccc;

  .hf {
    display: flex;
    margin-top: 10px;
    .left {
      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }
    }
    .center {
      flex: 1;
      margin: 5px;
      span {
        font-size: 12px;
        font-weight: bold;
      }
    }
    .right {
      font-size: 12px;
      color: #999;
    }
  }
  .content {
    margin: 0 20px;
    padding: 14px 0;
    font-size: 14px;
    word-break: break-all;
  }
  .time {
    font-size: 10px;
    color: #999;
    padding: 5px 0;
    padding-left: 20px;
  }
}
</style>