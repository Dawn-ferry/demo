<template>
  <div class="nav" @click="clickfn">
    <div class="left">{{ title }}</div>
    <div class="center"></div>
    <div class="right">
      {{ content }}
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'content'],
  methods: {
    clickfn() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
.nav {
  height: 30px;
  line-height: 30px;
  display: flex;
  border-bottom: 1px solid #ccc;
  margin-left: 16px;
  font-size: 12px;
  .left {
    font-size: 14px;
  }
  .center {
    flex: 1;
  }
  .right {
    color: #999;
    span {
      font-size: 16px;
      margin-right: 10px;
    }
  }
}
</style>
