<template>
  <div>
    <NavBar></NavBar>
    <div class="tag-info-box">
      <div class="tag-title">{{tagName}}</div>
      <span class="tag-meta">{{articles.length}}篇文章</span>
    </div>
    <div class="tag-content-list">
      <div class="tag-content-item" v-for="(item, index) in articles" :key="index">
        <h2 class="title">{{item.title}}</h2>
        <div class="tag-content-summary">{{item.summary}}</div>
        <div class="tag-content-info">
          <span class="list-title"><i class="el-icon-date"></i>{{item.createTime | dateFormat}}</span>
          <span class="list-title">
            <svg-icon icon-class="person" class="color-main"></svg-icon>{{item.username}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getArticlesByTagId} from '@/api/article'
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
      },
    },
  }
</script>

<style>
  .tag-info-box {
    height: 150px;
    background-color: #f8f9fa;
    border-bottom: 1px solid #f1f1f1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 10px;
  }
  .tag-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 5px;
  }
  .summary {
    font-size: 12px;
    color: #999;
    height: 40px;
    margin: 0 0 10px;
  }
  .tag-meta {
    font-size: 12px;
  }
  .tag-content-list {
    display: flex;
    max-width: 960px;
    margin: 0 auto;
    width: 100%;
    margin-top: 10px;
    flex-wrap: wrap;
  }
  .tag-content-item {
    margin: 10px;
    background-color: #fff;
    width: 25%;
    padding: 10px 20px;
  }
  .tag-content-item .title {
    font-size: 16px;
    font-weight: 700;
    display: flex;
    flex-direction: column;
    height: 50px;
    overflow: hidden;
  }
  .tag-content-summary {
    font-size: 14px;
    color: #999;
    height: 100px;
    overflow: hidden;
  }
  .tag-content-info {
    font-size: 14px;
    margin-top: 20px 0;
  }
</style>