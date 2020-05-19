<template>
  <div>
    <NavBar></NavBar>
    <div class="tag-banner">
      <div class="tag-title"><img src="static/images/tag.jpg"/></div>
    </div>
    <div class="tag-container">
      <div class="tag-header">
        <span style="margin-right: 20px;">最热</span>
        <span style="margin-right: 20px;">最新</span>      
        <span><input class="tag-search" placeholder="搜索标签"/></span>
      </div>
      <div class="tag-content-list">
        <ul>
          <li class="item" v-model="(item, index) in tags" :key="index">
            <div class="tag-info">{{item.name}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getArticlesByTagId,
    addArticleViewCount,
    getTagListWithHot
  } from '@/api/article'
  import NavBar from '@/components/NavBar'
  export default {
    name: 'Tag',
    components: {
      NavBar
    },
    data() {
      return {
        tagId: "",
        articles: [],
        tags: [],
        tagName: "",
      }
    },
    created() {
      this.tagId = this.$route.query.tagId
      this.getArticlesByTagId()
      getTagListWithHot().then(resp => {
        console.log(resp)
      })
    },
    filters: {
      strFilter(value) {
        if (value && value.length > 50) {
          value = value.substring(0, 50) + '...';
        }
        return value;
      }
    },
    methods: {
      getArticlesByTagId() {
        let params = {
          tagId: this.tagId
        }
        getArticlesByTagId(params).then(resp => {
          this.articles = resp.data.articles
          this.tagName = resp.data.name
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
  .tag-banner img{
    width: 100%;
    height: 200px;
  }
  .tag-container {
    width: 960px;
    margin: 0 auto;
  }
  .tag-container .tag-header {
    display: flex;
    align-items: center;
    margin: 10px 0;
    font-size: 14px;
  }
  .tag-search {
    padding: 5px;
    border: 1px solid #333;
    outline: none;
    font-size: 12px;
  }

  .tag-content-list ul{
    width: 100%;
  }
  .item {
    width: 20%;
    display: inline-block;
    margin-bottom: 10px;
    padding: 5px;
    box-sizing: border-box;
    text-align: center;
  }
  .tag-info {
    height: 50px;
    border: 1px solid #fff;
    background-color: #fff;
  }

  
</style>
