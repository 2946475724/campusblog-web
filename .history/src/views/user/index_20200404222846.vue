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
            <el-tab-pane label="文章" name="first">
              <Article :userId="userId"></Article>
            </el-tab-pane>
            <el-tab-pane label="动态" name="second">动态</el-tab-pane>
            <el-tab-pane label="最新评论" name="third">最新评论</el-tab-pane>
          </el-tabs>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
  import NavBar from '@/components/NavBar'
  import Article from './article'
  import {
    getUserInfo
  } from '@/api/user'
  export default {
    name: 'user',
    components: {
      NavBar,
      Article,
    },
    data() {
      return {
        activeName: 'first',
        user: {
          id: "",
          username: "",
          nickName: "",
          icon: "",
          note: "",
        },
        userId: null,
      }
    },
    created() {
      this.getUserInfo()
    },
    methods: {
      getUserInfo() {
        getUserInfo().then(resp => {
          this.userId = resp.data.id
          this.user.id = resp.data.id
          this.user.username = resp.data.username
          this.user.nickName = resp.data.nickName
          this.user.icon = resp.data.icon
          this.user.note = resp.data.note
        })
      },
      handleClick(tab, event) {
        console.log(tab, event);
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
