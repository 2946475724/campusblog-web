<template>
  <div>
    <NavBar></NavBar>
    <div class="bg-banner">
      <img src="/static/images/banner3.png"/>
    </div>
    <div class="wrapper">
      <div class="left-side">
        <ul class="nav-list" v-for="(item, index) in categoryList" :key="index">
          <li @click="getArticles(item.id)">{{item.name}}</li>
        </ul>
      </div>
      <div class="" v-for="(item, index) in articleList" :key="index">
        <h3>{{item.title}}</h3>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/NavBar'
  import {getCategoryList} from '@/api/category'
  import {getArticlesByCategoryId} from '@/api/article'
  export default {
    name: "Article",
    components: {
      NavBar
    },
    data() {
      return {
        categoryList: [],
        articleList: [],
      }
    },
    created() {
      this.getCategories()
      this.getArticlesByCategoryId()
    },
    methods: {
      // 获取分类
      getCategories() {
        getCategoryList().then(resp => {
          console.log(resp.data)
          this.categoryList = resp.data
        })
      },
      // 点击分类查询
      getArticles(categoryId) {
        let params = {
          categoryId: categoryId
        }
          getArticlesByCategoryId(params).then(resp => {
          this.articleList = resp.data
        })
      },
      // 根据分类id获取文章
      getArticlesByCategoryId() {
        
      }
    },
  }
</script>

<style>
  .bg-banner {
    width: 100%;
  }
  .bg-banner img {
    width: 100%;
    height: 300px;
  }
  .wrapper {
    width: 1110px;
    margin: 10px auto 0;
  }
  .left-side {
    width: 160px;
    background-color: #fff;
  }
  .nav-list  li{
    height: 48px;
    line-height: 48px;
    padding: 0 20px;
    font-size: 14px;
    color: #333333;
    cursor: pointer;
  }
  .nav-list li:hover {
    background-color: #eaeaea;
  }
</style>