<template>
  <div class="item">
    <div>
        <span class="null-text">暂无详情介绍</span>
        <!-- 这个组件对应 课程详情页面  课程介绍 课程章节 用户评论 常见问题 -->
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
     
    }
  }
}
</script>


<style scoped>

.item {
  width: 1200px;
  height: auto;
  margin: 0 auto;
}

.item .loading {
  width: 880px;
  height: auto;
  float: left;
  text-align: center;
}

.item .loading img {
  width: 30px;
  height: 30px;
  margin-top: 20px;
}

.item section {
  width: 880px;
  height: auto;
  padding: 20px;
  background: #fff;
  float: left;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  box-shadow: 0 2px 4px 0 #F0F0F0;
}

  
</style>
