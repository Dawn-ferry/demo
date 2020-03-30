<template>
  <div class="hm-post" @click="$router.push(`/post-detail/${zpost.id}`)">
    <!-- 视频结构 -->
    <div class="video" v-if="zpost.type==2">
      <div class="main">
        <div class="content">{{ zpost.title }}</div>
        <div class="imgs">
          <div class="play">
            <span class="iconfont iconshipin"></span>
          </div>
          <img :src="fixedURL(zpost.cover[0].url)" alt="图片加载中请稍后..." />
        </div>
        <div class="source">{{zpost.user.nickname}} {{zpost.comment_length}}跟帖</div>
      </div>
    </div>
    <!-- 单图片结构 -->
    <div class="single-img" v-else-if="zpost.cover.length<3">
      <div class="main">
        <div class="content">{{ zpost.title }}</div>
        <div class="source">{{zpost.user.nickname}} {{zpost.comment_length}}跟帖</div>
      </div>
      <img :src="fixedURL(zpost.cover[0].url)" alt="图片加载中请稍后..." />
    </div>
    <!-- 多图片结构 -->

    <div class="multiple-img" v-else>
      <div class="main">
        <div class="content">{{ zpost.title }}</div>
        <div class="imgs">
          <img :src="fixedURL(zpost.cover[0].url)" alt="图片加载中请稍后..." />
          <img :src="fixedURL(zpost.cover[1].url)" alt="图片加载中请稍后..." />
          <img :src="fixedURL(zpost.cover[2].url)" alt="图片加载中请稍后..." />
        </div>
        <div class="source">{{zpost.user.nickname}} {{zpost.comment_length}}跟帖</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["zpost"],
  methods: {
    fixedURL(url) {
      if (url.startsWith("http")) {
        return url;
      } else {
        return this.$axios.defaults.baseURL + url;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  padding: 6px 0;
  font-size: 14px;
}
.source {
  font-size: 10px;
  color: #666;
  padding: 6px 0;
}
.single-img {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  border-bottom: 1px solid #ddd;
  padding: 0 10px;
  // 解决图片的失真问题
  img {
    width: 120px;
    height: 74px;
    object-fit: cover;
  }
}
.multiple-img {
  border-bottom: 1px solid #ddd;
  padding: 0 10px;
  // 解决图片的失真问题
  .imgs {
    display: flex;
    justify-content: space-between;
    img {
      width: 112px;
      height: 74px;
      object-fit: cover;
    }
  }
}
.video {
  border-bottom: 1px solid #ddd;
  padding: 0 10px;
  // 解决图片的失真问题
  .imgs {
    display: flex;
    position: relative;
    img {
      flex: 1;
      width: 340px;
      height: 170px;
      object-fit: cover;
    }
    .play {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 60px;
      height: 60px;
      background: rgba(0, 0, 0, 0.5);
      color: white;
      border-radius: 50%;
      text-align: center;
      line-height: 60px;
      .iconshipin {
        font-size: 26px;
      }
    }
  }
}
</style>