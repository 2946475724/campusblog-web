<template>
  <div class="article-list">
    <div class="article-list-item" v-for="article in articleList" :key="article.id">
      <div class="item-content">
        <div class="item-pic">
          <img :src="article.coverImage" />
        </div>
        <div class="item-body">
          <a href="javascript:void(0);" @click="gotoInfo(article.id)">
            <h2 class="item-title">{{article.title}}</h2>
          </a>
          <p class="item-description">
            {{article.summary | strFilter}}
          </p>
          <div class="item-meta">
            <span class="date">
              <i class="el-icon-date"></i>
              <span>{{article.createTime | dateFormat}}</span>
            </span>
            <span class="views">
              <i class="el-icon-view"></i>
              <span>{{article.views === null ? 0 : article.views}}</span>
            </span>
            <span class="views">
              <i class="el-icon-chat-dot-round"></i>
              <span>{{article.comment}}</span>
            </span>
            <span class="views">
              <svg-icon icon-class="category" class="color-main"></svg-icon>
              <span>{{article.categoryName}}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "List",
    data() {
      return {
        articleList: [],
      }
    },
  }

</script>

<style>

</style>
