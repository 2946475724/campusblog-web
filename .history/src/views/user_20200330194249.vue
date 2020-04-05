<template>
  <div>
    <NavBar></NavBar>
    <div class="main-container">
      <div class="main-content">
        <div class="user-info">
          <div>
            <el-avatar :size="80" :fit="fit" icon="el-icon-user-solid" :src="user.icon"></el-avatar>
          </div>
          <div class="info-box">
            <h2>{{user.nickName}}</h2>
            <span>{{user.note}}</span>
          </div>
        </div>
        <div class="list-box">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
            <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
          </el-tabs>
        </div>
        <!-- <div class="sidebar">
          <div class="aside-article">
            <div class="title">
              <svg-icon icon-class="hot" class="color-main"></svg-icon>热门文章
            </div>
            <ul class="aside-article-list">
              <li class="item">
                <a><span>简单快速垃圾的地方</span></a>
              </li>
              <li class="item">
                <a><span>简单快速垃圾的地方</span></a>
              </li>
              <li class="item">
                <a><span>简单快速垃圾的地方</span></a>
              </li>
            </ul>
          </div>
        </div> -->
      </div>
    </div>
    
  </div>
</template>

<script>
  import NavBar from '@/components/NavBar'
  export default {
    name: 'user',
    components: {
      NavBar,
    },
    data() {
      return {
        activeName: 'second',
        user: {
          id: "",
          username: "",
          nickName: "",
          icon: "",
          note: "",
        },
      }
    },
    methods: {
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
    background-color: #fff;
  }
  .sidebar {
  width: 300px;
  margin-left: 10px;
  background-color: #fff;
  }
  .sidebar .aside-article {
  overflow: hidden;
  }
  .aside-article .title {
  height: 30px;
  line-height: 30px;
  padding: 0 16px;
  border-bottom: 1px solid #eee;
  text-transform: uppercase;
  }
  .aside-article .aside-article-list {
  padding: 5px 0;
  }
  .aside-article-list .item {
  display: block;
  height: 30px;
  line-height: 30px;
  padding: 0 16px;
  }
</style>