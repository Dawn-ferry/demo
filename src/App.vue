<template>
  <div id="app">
    <!-- 使用 keep-alive缓存组件
    说明：
      缓存组件，使其不被销毁
      
    -->
    <keep-alive :include="['home',]">
      <!-- 配置路由出口 -->
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less">
// 这是设置全局配置样式
html,
body,
#app {
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
}
</style>
