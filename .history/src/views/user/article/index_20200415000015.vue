<template>
  <div>
    <div class="article-box">
      <div class="article-item" v-for="(item, index) in articles" :key="index">
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
          <el-popover placement="top" width="160" v-model="visible">
            <p>确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="deleteSubmit(item.id)">确定</el-button>
            </div>
            <span class="meta-delete" slot="reference">删除</span>
          </el-popover>
          <el-popover placement="top" width="160" v-model="visible">
            <p>这是一段内容这是一段内容确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
            </div>
            <el-button slot="reference">删除</el-button>
          </el-popover>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getUserInfo} from '@/api/user'
  import {getArticlesByUserId, deleteArticleById} from '@/api/article'
  export default {
    name: 'Article',
    props: ["userId"],
    data() {
      return {
        visible: false,
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
      },
      deleteSubmit(id) {
        let params = {
          "id": id
        }
        deleteArticleById(params).then(resp => {
          if (resp.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getArticlesByUserId()
            this.visible = false
          } else {
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          }
        }).catch(err => {
          console.log(err)
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
