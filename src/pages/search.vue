<template>
  <div class="search">
    <header>
      <div class="left">
        <!-- 优化$router.back() -->
        <span class="iconfont iconjiantou2" @click="back"></span>
      </div>
      <div class="center">
        <input
          type="text"
          placeholder="请输入关键字"
          v-model="keyword"
          @keyup.enter="search"
          @input="recommend"
        />
      </div>
      <div class="right">
        <b @click="search">搜索</b>
      </div>
    </header>
    <!-- 搜索出弹出文章推荐 -->
    <div class="recommend" v-if="recommendlist.length > 0">
      <div
        class="item txt-c"
        v-for="item in recommendlist"
        :key="item.id"
        @click="key_search(item.title)"
      >
        {{ item.title }}
      </div>
    </div>
    <!-- 内容区域 -->
    <div class="list" v-else-if="list.length > 0">
      <hm-post v-for="post in list" :key="post.id" :zpost="post"></hm-post>
    </div>
    <div class="content" v-else>
      <div class="history">
        <h3 class="h-header">历史记录</h3>
        <div
          class="h-content"
          v-for="item in history"
          :key="item"
          @click="key_search(item)"
        >
          {{ item }}
        </div>
      </div>
      <div class="hot">
        <h3 class="s-header">热门搜索</h3>
        <div
          class="h-content"
          v-for="item in hot"
          :key="item"
          @click="key_search(item)"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入lodash
import _ from 'lodash'
export default {
  name: 'search',
  data() {
    return {
      keyword: '',
      list: [],
      history: [],
      hot: [],
      recommendlist: []
    }
  },
  created() {
    this.hot = ['美女', '关关', '动画片']
    const history = localStorage.getItem('history')
    if (history) {
      this.history = JSON.parse(history)
    }
  },
  methods: {
    async search() {
      //搜索关闭推荐
      this.recommendlist = []
      // 添加历史记录
      this.history = this.history.filter(item => item !== this.keyword)
      this.history.unshift(this.keyword)
      localStorage.setItem('history', JSON.stringify(this.history))
      //
      const res = await this.$axios.get('/post_search', {
        params: {
          keyword: this.keyword
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
    },
    key_search(item) {
      console.log(item)
      this.keyword = item
      this.search()
    },
    back() {
      if (this.keyword) {
        this.keyword = ''
      } else {
        this.$router.go(-1)
      }
    },
    recommend: _.debounce(async function() {
      if (!this.keyword) return
      const res = await this.$axios.get('/post_search_recommend', {
        params: {
          keyword: this.keyword
        }
      })
      const { statusCode, data } = res.data
      if (statusCode == 200) {
        this.recommendlist = data
        console.log(this.recommendlist)
      }
    }, 1000)
  },
  watch: {
    keyword(value) {
      if (!value) {
        this.list = []
        this.recommendlist = []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  padding: 0 10px;
}
header {
  display: flex;
  height: 80px;
  border-bottom: 1px solid #ccc;
  align-items: center;
  .left {
    .iconjiantou2 {
      font-size: 30px;
    }
  }
  .center {
    flex: 1;
    position: relative;
    input {
      width: 80%;
      height: 42px;
      border-radius: 30px;
      border: none;
      background-color: #ddd;
      padding: 0 30px;
      font-size: 12px;
    }
  }
  .right {
    width: 40px;
    padding-left: 30px;
    font-size: 16px;
  }
}
.recommend {
  position: absolute;
  left: 0;
  top: 80px;
  width: 85%;
  height: auto;
  background-color: #ddd;
  padding: 0 20px;
  // display: none;
  .item {
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-bottom: 1px solid #ccc;
    font-size: 12px;
    padding: 5px 0;
  }
}
h3 {
  padding: 10px 0;
}

.h-content {
  width: auto;
  height: 30px;
  line-height: 30px;
  background-color: #ccc;
  float: left;
  padding: 0 10px;
  margin: 5px;
  text-align: center;
}
.history {
  border-bottom: 1px solid #ccc;
  overflow: hidden;
}
</style>
