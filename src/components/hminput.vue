<template>
  <div class="hm-input">
    <input
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="inputfn"
      :class="{ success: status === 'success', error: status === 'error' }"
    />
    <!-- 校验规则 -->
    <div class="tips" v-show="status === 'error'">{{ message }}</div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    value: String,
    rule: RegExp,
    message: String
  },
  methods: {
    inputfn(e) {
      const value = e.target.value
      this.$emit('input', value)
      this.validate(value)
    },
    // 校验拦截不合理数据
    validate(value) {
      // 添加表单校验
      if (this.rule) {
        // 判断value值是否符合传入 的正则
        if (this.rule.test(value)) {
          this.status = 'success'
          return true
        } else {
          this.status = 'error'
          return false
        }
        // console.log(this.status)
      }
    }
  },
  data() {
    // 记录表单校验的状态
    return {
      status: ''
    }
  }
}
</script>

<style lang="less" scoped>
.hm-input {
  margin: 0 10px;
  input {
    height: 30px;
    line-height: 30px;
    width: 100%;
    border: none;
    border-bottom: 1px solid #ccc;
    font-size: 18px;
    outline: none;
    margin: 10px 0;
    &.success {
      border-color: green;
    }
    &.error {
      border-color: red;
    }
  }
  .tips {
    color: red;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
  }
}
</style>
