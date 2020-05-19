<template>
  <div>
    <NavBar></NavBar>
    <div class="tag-banner">
      <div class="tag-title"><img src="static/images/tag.jpg"/></div>
    </div>
    <div class="tag-container">
      <div class="tag-header">
        <span style="margin-right: 20px;">最新</span>
        <span style="margin-right: 20px;">最热</span>
        <span><input class="tag-search" placeholder="搜索标签"/></span>
      </div>
      <div class="tag-content-list">
        <ul >
          <li class="item">前端</li>
          <li class="item">前端</li>
          <li class="item">前端</li>
          <li class="item">前端</li>
          <li class="item">前端</li>
          <li class="item">前端</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getArticlesByTagId,
    addArticleViewCount
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
        tagName: "",
      }
    },
    created() {
      this.tagId = this.$route.query.tagId
      this.getArticlesByTagId()
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

  /* .tag-content-list {
    display: flex;
    max-width: 960px;
    margin: 0 auto;
    width: 100%;
    margin-top: 10px;
    flex-wrap: wrap;
    transition: all 0.3s;
    cursor: pointer;
  } */
  .item {
    width: 25%;
    display: inline-block;
    margin-bottom: 1.3rem;
    padding: 0 .7rem;
    box-sizing: border-box;
  }

  
</style>
