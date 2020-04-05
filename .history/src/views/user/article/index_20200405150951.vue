<template>
  <div>
    <div class="article-box">
      <div class="article-item" v-for="(item, index) in articles" :key="index">
        <h3>{{item.title}}</h3>
        <span>{{item.summary}}</span>
        <div class="item-bottom">
          <span>
            <i class="el-icon-view"></i>{{item.views}}
          </span>
          <span>
            <i class="el-icon-chat-dot-round"></i>{{item.comment}}
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
  }
  .item-bottom {
    display: flex;
    flex-direction: row;
    justify-content: start;
  }
</style>
