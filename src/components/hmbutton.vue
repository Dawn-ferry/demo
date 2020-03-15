<template>
  <div class="hm-button" @click="clickfn">
    <slot></slot>
  </div>
</template>

<script>
export default {
  methods: {
    clickfn() {
      this.$emit('click')
    }
  }
}
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
