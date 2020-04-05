<template>
  <div>
    <NavBar></NavBar>
    <div class="tag-info-box">
      <div class="tag-title">{{tagName}}</div>
      <span class="tag-meta">{{articles.length}}篇文章</span>
    </div>
    <div class="tag-entry-list">
      <el-row :gutter="10">
        <el-col :span="5" v-for="(item, index) in articles" :key="index">
          <el-card shadow="hover" body-style="height:100px" >
            <a href="javascript:void(0);" @click="gotoInfo(item.id)">
              <h3 class="title">{{item.title}}</h3>
              <div class="summary">{{item.summary}}</div>
              <span class="list-title"><i class="el-icon-date"></i>{{item.createTime | dateFormat}}</span>
              <span class="list-title">
                <svg-icon icon-class="person" class="color-main"></svg-icon>{{item.username}}
              </span>
            </a>  
          </el-card>
        </el-col>
      </el-row>
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
  .tag-entry-list {
    max-width: 960px;
    margin: 0 auto;
  }
  .tag-entry-list .title {
    margin-bottom: 5px;
  }
  .tag-entry-list .list-title {
    font-size: 12px;
  }
</style>