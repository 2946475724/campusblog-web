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
              <Article :userId="user.id" v-if="user.id!=undefined"></Article>
            </el-tab-pane>
            <el-tab-pane label="我的收藏" name="tab2">
              <Collection :userId="user.id" v-if="user.id!=undefined"></Collection>
            </el-tab-pane>
            <el-tab-pane label="我的关注" name="tab3">
              <Follow :userId="user.id" v-if="user.id!=undefined"></Follow>
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
    getArticlesByUserId 
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
      }
    },
    created() {
      this.getUserInfo()
    },
    methods: {
      // 获取用户信息
      getUserInfo() {
        getUserInfo().then(resp => {
          this.user = resp.data
          this.getArticlesByUserId()
          this.getCollectArticleByUserId()
        })
      },
      
      
      handleClick(tab, event) {
        console.log(tab.name)
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
