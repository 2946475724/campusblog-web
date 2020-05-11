<template>
  <div>
    <div class="article-box">
      <div style="text-align: center; font-size: 14px;" v-if="articles.length === 0">还未发表文章哦~</div>
      <div v-else class="article-item" v-for="(item, index) in articleList" :key="index">
        <h3 class="title">{{item.title}}</h3>
        <div class="description">{{item.summary}}</div>
        <div class="meta">
          <span class="meta-item">
            <svg-icon icon-class="view" class="icon-size"></svg-icon> {{item.views}}
          </span>
          <span class="meta-item">
            <svg-icon icon-class="comment" class="icon-size"></svg-icon> {{item.comment}}
          </span>
          <span class="meta-item">
            <svg-icon icon-class="like" class="icon-size"></svg-icon> {{item.likes}}
          </span>
          <span class="meta-delete" @click="deleteArticle(item.id)">删除</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getUserInfo
  } from '@/api/user'
  import {
    getArticlesByUserId,
    deleteArticleById
  } from '@/api/article'
  export default {
    name: 'Article',
    props: ["articleList", "isCollection"],
    data() {
      return {
        visible: false,
        activeName: 'first',
        user: {
          // id: this.userId,
          username: "",
          nickName: "",
          icon: "",
          note: "",
        },
        articleList: [],
      }
    },
    watch: {
      // userId(curInfo) {
      //   this.userId = curInfo
      //   this.getArticlesByUserId()
      // }
    },
    created() {
      console.log(this.$parent.userId)
      this.getArticlesByUserId()
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
      },
      deleteArticle(id) {
        let params = {
          id: id
        }
        this.$confirm("确认删除吗？", '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteArticleById(params).then(resp => {
            if (resp.code === 200) {
              this.getArticlesByUserId()
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
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

  .article-item .description {
    margin: 0 0 8px;
    line-height: 24px;
    font-size: 13px;
    color: #999;
    height: 40px;
  }

  .article-item .title {
    margin-bottom: 5px;
  }

  .meta {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: flex-end;
    font-size: 14px;
    position: relative;
  }

  .meta .meta-item {
    margin-right: 10px;
    font-size: 12px;
    font-weight: 400;
  }

  .meta-delete {
    font-size: 12px;
    position: absolute;
    bottom: 0;
    right: 0;
    cursor: pointer;
  }

</style>
