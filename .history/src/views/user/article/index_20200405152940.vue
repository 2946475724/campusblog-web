<template>
  <div>
    <div class="article-box">
      <div class="article-item" v-for="(item, index) in articles" :key="index">
        <h3>{{item.title}}</h3>
        <span class="description">{{item.summary}}</span>
        <div class="meta">
          <span class="meta-item">
            <i class="el-icon-view"></i> {{item.views}}
          </span>
          <span class="meta-item">
            <i class="el-icon-chat-dot-round"></i> {{item.comment}}
          </span>
          <span class="meta-item">
            <svg-icon icon-class="like"></svg-icon> {{item.likes}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getUserInfo} from '@/api/user'
  import {getArticlesByUserId} from '@/api/article'
  export default {
    name: 'Article',
    props: ["userId"],
    data() {
      return {
        activeName: 'first',
        user: {
          id: this.userId,
          username: "",
          nickName: "",
          icon: "",
          note: "",
        },
        articles: [],
      }
    },
    watch: {
      userId(curInfo) {
        this.userId = curInfo
        this.getArticlesByUserId()
      }
    },
    created() {
      
    },
    methods: {
      getArticlesByUserId() {
        let params = {
          userId: this.userId
        }
        getArticlesByUserId(params).then(resp => {
          console.log(resp.data)
          this.articles = resp.data
        })
      }
    },
  }
</script>

<style>
  .article-box {
    display: flex;
    flex-direction: column;
    
  }
  .article-item {
    height: 100px;
    border-bottom: 1px solid #f0f0f0;
    padding: 10px 0;
  }
  .description {
    margin: 0 0 8px;
    line-height: 24px;
    font-size: 13px;
    color: #999;
  }
  .meta {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: flex-end;
  }
  .meta-item {
    margin-right: 10px;
    font-size: 12px;
    font-weight: 400;
  }
</style>
