<template>
  <div>
    <NavBar></NavBar>
    <div class="bg-banner">
      <img src="/static/images/banner3.png" />
    </div>
    <div class="wrapper">
      <div class="left-side">
        <ul class="nav-list" v-for="(item, index) in sideBar" :key="index">
          <li @click="getArticles(item.id)" :class='[isCurrent == item.id ? "current" : ""]'>{{item.name}}</li>
        </ul>
      </div>
      <div class="wrapper-article">
        <div class="article-list">
          <div class="article-list-item" v-for="(item, index) in articleList" :key="index">
            <div class="item-content">
              <div class="item-pic">
                <img :src="item.coverImage" />
              </div>
              <div class="item-body">
                <a href="javascript:void(0);" @click="gotoInfo(item.id)">
                  <h2 class="item-title">{{item.title}}</h2>
                </a>
                <p class="item-description">
                  {{item.summary | strFilter}}
                </p>
                <div class="item-meta">
                  <span class="date">
                    <i class="el-icon-date"></i>
                    <span>{{item.createTime | dateFormat}}</span>
                  </span>
                  <span class="views">
                    <i class="el-icon-view"></i>
                    <span>{{item.views === null ? 0 : item.views}}</span>
                  </span>
                  <span class="views">
                    <i class="el-icon-chat-dot-round"></i>
                    <span>{{item.comment}}</span>
                  </span>
                  <span class="views">
                    <svg-icon icon-class="category" class="color-main"></svg-icon>
                    <span>{{item.categoryName}}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/NavBar'
  import {
    getCategoryList,
    getCategories
  } from '@/api/category'
  import {
    getArticlesByCategoryId,
    addArticleViewCount
  } from '@/api/article'
  const defaultQuery = {
    keyword: "",
    pageNum: 1,
    pageSize: 5,
  };
  export default {
    name: "Article",
    components: {
      NavBar,
    },
    data() {
      return {
        sideBar: [
          {id: "recommended", name: "推荐"}
        ],
        listQuery: Object.assign({}, defaultQuery),
        articleList: [],
        isCurrent: null,
        totalPage: 0,
        pageSize: 5,
        isEnd: false, // 是否到底部了
        loading: false, // 内容是否正在加载
      }
    },
    created() {
      this.getCategories()
    },
    methods: {
      // 获取分类
      getCategories() {
        getCategories().then(resp => {
          this.sideBar = this.sideBar.concat(resp.data)
          this.isCurrent = resp.data.list[0].id
          this.getArticles(resp.data.list[0].id)
        })
      },
      // 点击分类查询
      getArticles(value) {
        if (value === "recommended") {

        }
        this.isCurrent = value
        let params = {
          categoryId: value
        }
        getArticlesByCategoryId(params).then(resp => {
          this.articleList = resp.data
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
    },
  }

</script>

<style>
  .bg-banner {
    width: 100%;
  }

  .bg-banner img {
    width: 100%;
    height: 200px;
  }

  .wrapper {
    display: flex;
    width: 1110px;
    margin: 20px auto 0;
  }

  .left-side {
    width: 120px;
    margin-right: 20px;
    text-align: center;
  }

  .nav-list {
    background-color: #fff;
  }

  .nav-list li {
    height: 48px;
    line-height: 48px;
    padding: 0 20px;
    font-size: 14px;
    cursor: pointer;
  }

  .nav-list li:hover {
    background-color: #0371df;
    color: #fff;
  }

  .current {
    background-color: #0371df;
    color: #fff;
    border-radius: 2px;
  }

  .article-list-item {
    margin-bottom: 10px;
  }

  .wrapper-article {
    width: 800px;
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
  }

  .load-content {
    background-color: #eeaaee;
    padding: 5px 10px;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    margin-top: 20px;
  }

  .load-content:hover {
    color: green;
  }

</style>
