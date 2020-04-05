<template>
  <div>
    <NavBar></NavBar>
    <div class="tag-info-box">
      <div class="tag-title">标签页</div>
      <span class="tag-meta">10篇文章</span>
    </div>
    <div class="tag-entry-list">
      <el-row :gutter="10" type="flex" justify="center">
        <el-col :span="5" v-for="item in articles">
          <el-card shadow="hover" body-style="height:100px">
            <h3>{{item.title}}</h3>
            <span style="height: 50px;">发布日期:2020年10月29日</span>
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
  .tag-entry-list {
    margin-top: 10px;
  }
</style>