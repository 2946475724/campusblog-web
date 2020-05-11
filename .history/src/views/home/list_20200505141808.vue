<template>
  <div class="article-list">
    <div class="article-list-item" v-for="(article, index) in articleList" :key="article.id">
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
              <svg-icon icon-class="time" class="icon-size"></svg-icon>
              <span>{{article.createTime | dateFormat}}</span>
            </span>
            <span class="views">
              <svg-icon icon-class="view" class="icon-size"></svg-icon>
              <span>{{article.views === null ? 0 : article.views}}</span>
            </span>
            <span class="views">
              <svg-icon icon-class="comment" class="icon-size"></svg-icon>
              <span>{{article.comment}}</span>
            </span>
            <span class="views">
              <svg-icon icon-class="like" class="icon-size"></svg-icon>
              <span>{{article.likes}}</span>
            </span>
            <span class="views">
              <svg-icon icon-class="category" class="color-size"></svg-icon>
              <span>{{article.categoryName}}</span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="list-end">
      <div class="load-content" v-if="!isEnd && totalPage > 0" @click="loadContent">
        点击加载更多
      </div>
      <span class="" v-if="isEnd">我也是有底线的~</span>
      <span v-if="totalPage === 0">空空如也~</span>
    </div>
  </div>
</template>

<script>
  import {
    fetchList,
    addArticleViewCount
  } from "@/api/article";
  export default {
    name: "List",
    data() {
      return {
        articleList: [],
        keyword: "",
        currentPage: 1,
        totalPage: 0,
        pageSize: 5,
        isEnd: false, // 是否到底部了
        loading: false, // 内容是否正在加载
        searchArticleList: [],
      }
    },
    created() {
      this.getArticleList();
    },
    watch: {
      $route(to, from) {
        this.keyword = this.$route.query.keyword;
        this.searchArticleList = [];
        this.getArticleList();
      }
    },
    methods: {
      getArticleList() {
        this.keyword = this.$route.query.keyword
        let  params = {
          "pageNum": this.currentPage,
          "keyword": this.keyword
        }
        fetchList(params).then(resp => {
          this.totalPage = resp.data.totalPage
          this.pageSize = resp.data.pageSize
          let articles = resp.data.list;
          if (articles.length < this.pageSize) {
            this.isEnd = true
          }
          articles = this.searchArticleList.concat(articles)
          this.searchArticleList = articles
          this.articleList = articles
          console.log(resp.data.list);
        })
      },
      //跳转文章详情页
      gotoInfo(id) {
        console.log(id);
        let routeData = this.$router.push({
          path: `/detail/${id}`,
        })
        addArticleViewCount(id).then(resp => {
          console.log(resp)
        })
      },
      //加载更多
      loadContent() {
        this.currentPage = this.currentPage + 1
        if (this.currentPage === this.totalPage) {
          this.isEnd = true
        }
        console.log(this.isEnd)
        this.getArticleList()
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
    width: 30%;
    max-width: 200px;
    height: 150px;
    overflow: hidden;
  }

  .item-pic img {
    width: 100%;
    height: 100%;
    transition: all 0.6s ease;
  }

  .item-pic img:hover {
    transform: scale(1.1);
  }

  .item-body {
    margin-left: 15px;
    width: 100%;
  }

  .item-title {
    margin-top: 3px;
    margin-bottom: 5px;
    font-size: 20px;
    font-weight: 700;
    color: #333;
    transition: margin 0.25s;
  }
  .item-title:hover {
    color: #eeaaee;
    margin-left: 5px;
  }

  .item-description {
    margin-top: 10px;
    height: 80px;
    font-size: 13px;
    line-height: 20px;
    overflow: hidden;
    margin-bottom: 10px;
    word-wrap: break-word;
    color: #999;
  }

  .item-meta {
    height: 15px;
    line-height: 15px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    overflow: hidden;
    word-wrap: normal;
    white-space: nowrap;
    font-size: 12px;
  }
  .list-end {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .load-content {
    background-color: #eeaaee;
    padding: 7px 20px;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    border-radius: 5px;
  }
  .load-content:hover {
    color: #fff;
    background-color: #f0a2f0;
  }

</style>
