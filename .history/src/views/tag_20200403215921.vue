<template>
  <div>
    <NavBar></NavBar>
    <div class="tag-info-box">
      <div class="tag-title">标签页</div>
      <span class="tag-meta">10篇文章</span>
    </div>
    <div class="tag-entry">
      <el-card shadow="hover" v-for="item in articles">
        <h3>{{item.title}}</h3>
        <span></span>
      </el-card>
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
      }
    },
    created() {
      this.tagId = this.$route.query.tagId
      this.getArticlesByTagId()
    },
    methods: {
      getArticlesByTagId() {
        let params = {
          tagId: this.tagId
        }
        getArticlesByTagId(params).then(resp => {
          this.articles = resp.data;
          console.log(resp.data)
        })
      }
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
  }
  .tag-meta {
    font-size: 12px;
  }
</style>