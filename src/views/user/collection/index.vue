<template>
  <div>
    <div class="article-box">
      <div style="text-align: center; font-size: 14px;" v-if="collectArticleList.length === 0">还未收藏文章哦~</div>
      <div v-else class="article-item" v-for="(item, index) in collectArticleList" :key="index">
        <h3 class="title" @click="gotoInfo(item.id)">{{item.title}}</h3>
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
          <span class="meta-delete" @click="cancel(item.id)">取消收藏</span>
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
    collectArticle,
    getCollectArticleByUserId
  } from '@/api/article'
  export default {
    name: 'Collection',
    props: ["userId"],
    data() {
      return {
        user: "",
        collectArticleList: [],
      }
    },
    created() {
      this.getCollectArticleByUserId()
    },

    methods: {
      // 通过用户id获取收藏文章列表
      getCollectArticleByUserId() {
        getCollectArticleByUserId(this.userId).then(resp => {
          this.collectArticleList = resp.data
        })
      },
      // 取消收藏
      cancel(id) {
        let data = {
          articleId: id,
          userId: this.userId,
          status: 0,
        }
        console.log(data)
        this.$confirm("确认取消收藏吗？", '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          collectArticle(data).then(resp => {
            if (resp.code === 200) {
              this.getCollectArticleByUserId()
              this.$message({
                type: 'success',
                message: '取消收藏成功!'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      // 跳转文章详情页
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
