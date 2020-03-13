<template>
  <header>
    <div class="left" @click="$router.go(-1)">
      <span class="iconfont iconjiantou2"></span>
    </div>

    <div class="center">
      <slot></slot>
    </div>

    <div class="right"></div>
  </header>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
header {
  height: 36px;
  line-height: 36px;
  padding: 0 10px;
  display: flex;
  border-bottom: 1px solid #ccc;
  text-align: center;
  background-color: skyblue;
  .left,
  .right {
    width: 30px;
  }
  .center {
    flex: 40px;
    font-weight: bold;
    font-size: 18px;
  }
}
</style>
