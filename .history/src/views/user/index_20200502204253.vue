<template>
  <div>
    <NavBar></NavBar>
    <div class="main-container">
      <div class="main-content">
        <div class="user-info">
          <div>
            <el-avatar :size="80" fit="fit" icon="el-icon-user-solid" :src="user.icon"></el-avatar>
          </div>
          <div class="info-box">
            <h2>{{user.nickName}}</h2>
            <span>{{user.note}}</span>
          </div>
        </div>
        <div class="list-box">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="文章" name="tab1">
              <Article :articleList="articleList"></Article>
            </el-tab-pane>
            <el-tab-pane label="我的收藏" name="tab2">
              <Collection :collectArticleList="collectArticleList"></Collection>
            </el-tab-pane>
            <el-tab-pane label="我的关注" name="tab3">
              <Follow :userId="user.id"></Follow>
            </el-tab-pane>
            <!-- <el-tab-pane label="动态" name="tab4">动态</el-tab-pane>
            <el-tab-pane label="最新评论" name="tab5">最新评论</el-tab-pane> -->
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/NavBar'
  import Follow from './follow'
  import Article from './article'
  import Collection from './collection'
  import {
    getUserInfo
  } from '@/api/user'
  import {
    getArticlesByUserId,
    deleteArticleById,
    getCollectArticleByUserId
  } from '@/api/article'
  export default {
    name: 'user',
    components: {
      NavBar,
      Article,
      Follow,
      Collection
    },
    data() {
      return {
        activeName: 'tab1',
        user: "",
        articleList: [],
        collectArticleList: [],
      }
    },
    created() {
      getUserInfo().then(resp => {
      this.user = resp.data
      this.getArticlesByUserId()
      })
    },
    methods: {
      // 获取用户信息
      getUserInfo() {
        // getUserInfo().then(resp => {
        //   this.user = resp.data
        //   this.getArticlesByUserId()
        //   this.getCollectArticleByUserId()
        // })
      },
      // 通过用户id获取用户创作文章列表
      getArticlesByUserId() {
        let data = {
          userId: this.user.id
        }
        getArticlesByUserId(data).then(resp => {
          this.articleList = resp.data
        })
      },
      // 通过用户id获取收藏文章列表
      getCollectArticleByUserId() {
        getCollectArticleByUserId(this.user.id).then(resp => {
          this.collectArticleList = resp.data
        })
      },
      handleClick(tab, event) {
        if (tab.name === 'tab1') {
          getArticlesByUserId()
        } else if (tab.name === 'tab2') {
          getCollectArticleByUserId()
        }
      }
    },
  }

</script>

<style>
  .main-container {
    display: flex;
  }

  .user-info {
    background-color: #fff;
    display: flex;
    flex-direction: row;
    padding: 20px;
  }

  .info-box {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    margin-left: 15px;
  }

  .list-box {
    margin-top: 10px;
    padding: 20px;
    background-color: #fff;
  }

</style>
