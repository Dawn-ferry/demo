<template>
  <div class="hm-button">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.hm-button {
  margin: 26px;
  height: 36px;
  line-height: 36px;
  color: white;
  background-color: orange;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  border-radius: 20px;
}
</style>