<template>
  <div class="header-container">
    <header class="header">
      <div class="logo">
        <router-link to="">
          <a href="">CampusBlog</a>
        </router-link>
      </div>
      <!-- 导航栏 -->
      <ul class="header-list">
        <li>
          <router-link to="/">
            <a href="javascript:void(0);">首页</a>
          </router-link>
        </li>
        <li>
          <router-link to="">
            <a href="javascript:void(0);">博客</a>
          </router-link>
        </li>
      </ul>
      <div class="search-box">
        <svg-icon icon-class="search" class="color-main"></svg-icon>
      </div>
      <div class="editor">
        <router-link to="/editor"><a href="javascript:void(0);">写文章</a></router-link>
      </div>
      <!-- 登录注册按钮 -->
      <div class="user-box">
        <div v-if="!isLogin">
          <span @click="dialogVisible = !dialogVisible">登录</span>
          <span>|</span>
          <span>注册</span>
        </div>
        <div class="avatar" v-if="isLogin">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <el-avatar shape="circle" :src="getUserAvatar"></el-avatar>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="gotoUserInfo">主页</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>     
        </div>
      </div>
      <!-- 弹出登录框 -->
      <el-dialog title="登录" width="30%" :visible.sync="dialogVisible" :append-to-body='true' :lock-scroll="false" center>
        <el-form label-width="80px" label-position="right" :model="user" :rules="rules" ref="user">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="user.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="user.password" auto-complete="new-password"></el-input>
          </el-form-item>
          <!-- <span class="pwd">
              <a href="">忘记密码？</a>
              <a href="">还没账号,注册一个</a>
            </span> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleLogin('user')">登 录</el-button>
        </div>
      </el-dialog>
    </header>
  </div>
</template>

<script>
  import { Loading } from 'element-ui';
  import {setSupport,getSupport,setCookie,getCookie} from '@/utils/support';
  import { getToken, setToken, removeToken } from '@/utils/auth';
  import {authVerify} from '@/api/user'
  import {mapMutations} from 'vuex';
  import {mapGetters} from 'vuex';
  export default {
    name: 'Top',
    data() {
      return {
        dialogVisible: false,
        isLogin: false,
        user: {   //登录表单信息
          username: "",
          password: "",
        },
        rules: {
          username: [{ required: true, message: '请输入用户名', trigger: 'blur' },],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' },]
        },
      };
    },
    created() {
      this.getToken();
    },
    computed: {
      ...mapGetters(['getUserAvatar']),
    },
    methods: {
      //判断是否有token，获取用户信息
      getToken() {
        let token = getToken('loginToken');
        if(token != undefined) {
          this.isLogin = true;
          authVerify(token).then(resp => {
            this.$store.commit('SET_LOGIN_STATE', true);
            this.$store.commit('SET_USER_INFO', resp.data);
          })
        }
      },
      //登录
      handleLogin(user) {
        this.$refs[user].validate((valid) => {
          if(valid) {
            this.$store.dispatch('Login', this.user).then(() => {
              this.loading = false;
              this.isLogin = true;
              this.dialogVisible = !this.dialogVisible;
            }).catch(() => {
              this.loading = false
            })
          } else {
            return false;
          }
        })
        
      },
      handleCommand(command) {
        console.log(command);
        switch (command) {
          case "gotoUserInfo":
            this.gotoUserInfo();
            break;
          case "logout":
            this.handleLogOut();
            break;
        
          default:
            break;
        }
      },
      //登出
      handleLogOut() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload();
        })
      },
      //跳转到个人中心
      gotoUserInfo() {
        this.$router.push('/user');
      },
    },
  }

</script>

<style>
  .header-container {
    height: 60px;
  }

  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    line-height: 60px;
    z-index: 999;
    text-align: center;
    background-color: #eee;
    display: flex;
    justify-content: center;
  }

  .logo {
    font-size: 22px;
    font-weight: 700;
    float: left;
  }

  .header-list {
    width: 1080px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 50px;
    overflow: hidden;
  }

  .header-list li {
    display: flex;
    font-size: 16px;
    padding: 0 25px;
    list-style: none;
  }

  .search-box {}

  .editor {
    width: 100px;
    cursor: pointer;
  }

  .user-box {
    width: 100px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .dialog-footer {
    text-align: center;
  }
</style>
