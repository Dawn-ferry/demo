<template>
  <div>
    这是个demo组件
    <demo1 v-if="Math.random()<0.5"></demo1>
  </div>
</template>

<script>
export default {
  //给当前组件起一个名字
  name: "demo1"
};
</script>

<style>
</style>