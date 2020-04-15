<template>
  <div class="header-container">
    <header class="header">
      <!-- logo -->
      <div class="logo">
        <router-link to="/">
          <a href="javascript:void(0);">CampusBlog</a>
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
          <router-link to="/article">
            <a href="javascript:void(0);">博客</a>
          </router-link>
        </li>
      </ul>
      <div class="search-box">
        <input 
          type="text" 
          class="" 
          placeholder="搜一搜"
          name=""
          v-model="keyword"
          v-on:keyup.enter="search"/>
        <svg-icon icon-class="search" class="color-main svg" @click.native="search"></svg-icon>
      </div>
      <div class="editor">
        <svg-icon icon-class="editor" class="icon-size"></svg-icon>
        <router-link to="/editor"><a class="editor-btn" href="javascript:void(0);">写文章</a></router-link>
      </div>
      <!-- 登录注册按钮 -->
      <div class="user-box">
        <div v-if="!isLogin">
          <span @click="gotoLogin">登录</span>
          <span>|</span>
          <span @click="gotoSignUp">注册</span>
        </div>
        <div class="avatar" v-if="isLogin">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <el-avatar size="small" icon="el-icon-user-solid" :src="getUserAvatar"></el-avatar>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="gotoUserInfo">主页</el-dropdown-item>
              <el-dropdown-item command="gotoSetting">设置</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>     
        </div>
      </div>
      
      <el-dialog width="23%" :visible.sync="dialogVisible" :append-to-body='true' :lock-scroll="false">
        <!-- 弹出登录框 -->
        <div v-if="loginVisible" class="login-box">
          <span slot="title" class="login-box-title">
            <h2>登录</h2>
            <span class="login-tip">没有账号? 请点击 <span class="login-tip-click"
                @click="gotoSignUp">注册</span></span>
          </span>
          <el-form label-position="right" :model="user" :rules="rules" ref="user" class="login-box-form">
            <el-form-item prop="username">
              <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="user.password" auto-complete="new-password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <span class="remember-pwd">
              <el-checkbox v-model="checked">自动登录</el-checkbox>
              <a href="">忘记密码</a>
            </span>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button class="login-button" type="primary" @click="handleLogin('user')">登 录</el-button>
          </div>
        </div>
        <!-- 弹出注册框 -->
        <div v-else>
          <span slot="title" class="login-box-title">
            <h2>注册</h2>
            <span class="login-tip">已有账号? 请点击 <span class="login-tip-click" @click="gotoLogin">登录</span></span>
          </span>
          <el-form label-position="right" :model="user" :rules="rules" ref="user" class="login-box-form">
            <el-form-item prop="username">
              <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="user.password" auto-complete="new-password" placeholder="请输入密码"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button class="login-button" type="primary" @click="handleSignUp('user')">注 册</el-button>
          </div>
        </div>
      </el-dialog>
    </header>
  </div>
</template>

<script>
  import { Loading } from 'element-ui';
  import {setSupport,getSupport,setCookie,getCookie} from '@/utils/support';
  import { getToken, setToken, removeToken } from '@/utils/auth';
  import {authVerify, register, getUserInfo} from '@/api/user'
  import {mapMutations} from 'vuex';
  import {mapGetters} from 'vuex';
  export default {
    name: 'NavBar',
    data() {
      return {
        loginVisible: false,
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
        checked: true, // 自动登录
        keyword: "",
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
          getUserInfo().then(resp => {
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
              this.dialogVisible = false
            }).catch(() => {
              this.loading = false
            })
          } else {
            return false;
          }
        })
      },
      //注册
      handleSignUp(user) {
        this.$refs[user].validate((valid) => {
          if (valid) {
            register(this.user).then(resp => {
              if (resp.code === 200) {
                this.$message("注册成功")
                this.handleLogin(user)
                this.dialogVisible = false
              }
              
              
            })
          }
        })
      },
      handleCommand(command) {
        console.log(command);
        switch (command) {
          case "gotoUserInfo":
            this.gotoUserInfo();
            break;
          case "gotoSetting":
            this.gotoSetting();
            break;
          case "logout":
            this.handleLogOut();
            break;
          default:
            break;
        }
      },
      //跳转注册
      gotoSignUp() {
        this.dialogVisible = true
        this.loginVisible = false
      },
      //跳转登录
      gotoLogin() {
        this.dialogVisible = true
        this.loginVisible = true
      },
      //登出
      handleLogOut() {
        this.$store.dispatch('LogOut').then(() => {
          this.$router.push({path: "/"})
          location.reload();
        })
      },
      //跳转到个人中心
      gotoUserInfo() {
        this.$router.push('/user')
      },
      //跳转到设置页面
      gotoSetting() {
        this.$router.push('/setting')
      },
      search() {
        if (this.keyword === "") {
          this.$message({
            message: "关键字不能为空",
            type: "warning"
          })
          return;
        }
        console.log(this.keyword)
        this.$router.push({ path: "/list", query: { keyword: this.keyword } });
      },
    },
  }

</script>

<style>
  .header-container {
    height: 60px;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 10px 0px;
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
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo {
    font-size: 22px;
    font-weight: 700;
  }

  .header-list {
    width: 50%;
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

  .search-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    width: 200px;
    height: 35px;
    background: #eee none repeat scroll 0 0;
    border-radius: 20px;
  }
  .search-box input {
    background: transparent none repeat scroll 0 0;
    border: medium none;
    flex-grow: 1;
    font-weight: 400;
    height: 30px;
    letter-spacing: 1px;
    line-height: 20px;
    padding: 0 8px;
    width: 50px;
    outline: none;
    font-size: 14px;
    color: rgb(38, 38, 38);
  }
  .search-box .svg {
    cursor: pointer;
  }

  .header .editor {
    width: 100px;
    cursor: pointer;
  }
  .editor-btn {
    line-height: 20px;
    border-radius: 20px;
    /* background-color: #0876e4; */
    /* padding: 8px 15px; */
    font-size: 14px;
    /* color: #fff; */
    text-decoration: none;
  }
  .editor-btn:hover {
    /* background-color: #2d78f4;
    color: #fff; */
  }

  .user-box {
    width: 100px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
    font-size: 14px;
  }
  .avatar {
    height: 40px;
  }
  .login-box {
    transition-property: width;
    transition-duration: 1s;
    transition-timing-function: linear;
    transition-delay: 2s;
  }
  .login-box-title h2{
    color: #27282d;
    font-size: 22px;
    height: 30px;
    line-height: 30px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .login-tip {
    font-size: 12px;
    color: #27282d;
  }
  .login-tip-click {
    color: #27282d;
    font-weight: 700;
    cursor: pointer;
    padding-left: 4px;
  }
  .login-box-form {
    margin: 20px 0;
  }
  .remember-pwd {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .dialog-footer {
    text-align: center;
    margin-bottom: 80px;
  }
  .login-button {
    width: 100%;
  }
</style>
