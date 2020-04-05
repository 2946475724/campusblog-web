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
  import {
    fetchList
  } from "@/api/article";
  export default {
    name: "List",
    data() {
      return {
        articleList: [],
        keyword: "",
      }
    },
    created() {
      this.getArticleList();
      this.keyword = this.$route.query.keyword
    },
    watch: {
       $route(to, from) {
        this.keyword = this.$route.query.keyword
        this.getArticleList()
       }
    },
    methods: {
      getArticleList() {
        this.keyword = this.$route.query.keyword
        // if (this.keyword != undefined) {
          let  params = {
            "title": this.keyword
          }
          
          fetchList(params).then(response => {
            this.articleList = response.data.list;
            console.log(response.data.list);
          })
        // }
      },
      //跳转文章详情页
      gotoInfo(id) {
        console.log(id);
        let routeData = this.$router.push({
          path: `/detail/${id}`,
        })
      },
    },
    filters: {
      strFilter(value) {
        if (value && value.length > 50) {
          value = value.substring(0, 50) + '...';
        }
        return value;
      }
    },
  }

</script>

<style>
  .article-list-item {
    margin-bottom: 10px;
  }

  .item-content {
    display: flex;
    flex-direction: row;
    overflow: hidden;
    height: 150px;
    padding: 10px;
    background-color: #fff;
  }

  .item-pic {
    width: 200px;
    height: 150px;
    overflow: hidden;
  }

  .item-pic img {
    width: 200px;
    height: 150px;
    transition: all 0.6s ease;
  }

  .item-pic img:hover {
    transform: scale(1.1);
  }

  .item-body {
    margin-left: 10px;
    flex-grow: 1;
  }

  .item-title {
    margin-top: 3px;
    margin-bottom: 5px;
    font-weight: 700;
  }

  .item-description {
    margin-top: 10px;
    height: 80px;
    font-size: 13px;
    overflow: hidden;
    margin-bottom: 10px;
    word-wrap: break-word;
  }

  .item-meta {
    height: 15px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    overflow: hidden;
    word-wrap: normal;
    white-space: nowrap;
    font-size: 12px;
  }

</style>
