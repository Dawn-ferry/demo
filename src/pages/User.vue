<template>
  <div>
    <hm-header>用户中心</hm-header>
    <div class="header">
      <div class="left">
        <img src="../images/2.jpg" alt="图片加载请稍后..." />
      </div>
      <div class="center">
        <div class="title">
          <span class="iconfont iconxingbienv"></span>
          <span>火星网页</span>
        </div>
        <div class="time">2019-10-10</div>
      </div>
      <div class="right">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <hm-navbar title="我的关注" content="关注的用户"></hm-navbar>
    <hm-navbar title="我的跟帖" content="跟帖/回复"></hm-navbar>
    <hm-navbar title="我的收藏" content="文章/视频"></hm-navbar>
    <hm-navbar title="设置" content=""></hm-navbar>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
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
