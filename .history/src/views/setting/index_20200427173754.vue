<template>
  <div>
    <NavBar></NavBar>
    <div>
      <nav class="view-nav">
        <ul>
          <li v-for="navItem in nav" ref="navItem"  @click="selectNav(navItem)">
            <a href="javascript:void(0);" :class="{active:activeName === navItem}">{{navItem}}</a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="setting-box">
      <div class="setting-profile" v-if="displayContent === 1">
        <h2>个人资料</h2>
        <el-form :model="user" label-width="100px" label-position="left">
          <el-form-item label="头像">
            <el-upload action="http://localhost:8080/file/uploadImage" name="image" :show-file-list="false"
              :http-request="uploadAvatar" :on-success="handleAvatarSuccess" :before-upload="handleBeforeUpload"
              class="avatar-uploader">
              <img v-if="user.icon" :src=user.icon class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="user.username" placeholder="填写你的用户名" :disabled="true" size="small" style="width: 50%;">
            </el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="user.nickName" placeholder="填写你的昵称" size="small" style="width: 50%;"></el-input>
          </el-form-item>
          <el-form-item label="个人简介">
            <el-input v-model="user.note" placeholder="填写你的介绍" size="small" style="width: 50%;"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" size="small" @click="save">保存</el-button>
      </div>
       <div class="setting-profile" v-if="displayContent === 2">
         <h2>修改密码</h2>
         <el-form :model="user" label-width="100px" label-position="left">
           <el-form-item label="旧密码">
             <el-input v-model="passwordForm.oldPassword" placeholder="请输入原密码" show-password size="small"
               style="width: 50%;">
             </el-input>
           </el-form-item>
           <el-form-item label="新密码">
             <el-input v-model="passwordForm.newPassword" placeholder="新密码" show-password size="small"
               style="width: 50%;">
             </el-input>
           </el-form-item>
           <el-form-item label="确认密码">
             <el-input v-model="passwordForm.confirmPassword" placeholder="确认新密码" show-password size="small"
               style="width: 50%;">
             </el-input>
           </el-form-item>
         </el-form>
         <el-button type="primary" size="small" @click="update">保存修改</el-button>
       </div>
    </div>

  </div>
</template>

<script>
  import NavBar from '@/components/NavBar'
  import SingleUpload from '@/components/Upload/singleUpload'
  import {
    uploadImage
  } from '@/api/file'
  import {
    getUserInfo,
    updateUserInfo,
    updatePassword
  } from '@/api/user'
  export default {
    name: 'setting',
    components: {
      NavBar,
      SingleUpload,
    },
    data() {
      return {
        user: {
          id: "",
          username: "",
          nickName: "",
          icon: "",
          note: "",
        },
        url: "",
        nav: ['个人资料', '修改密码'],
        activeName: '',
        displayContent: 1,
        passwordForm: {
          username: '',
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        }
      }
    },
    inject: ['reload'],
    created() {
      this.getUserInfo();
      this.activeName = '个人资料'
      this.passwordForm.oldPassword = ""
      this.passwordForm.newPassword = ""
      this.passwordForm.confirmPassword = ""
    },
    methods: {
      getUserInfo() {
        getUserInfo().then(resp => {
          this.user.id = resp.data.id
          this.user.username = resp.data.username
          this.user.nickName = resp.data.nickName
          this.user.icon = resp.data.icon
          this.user.note = resp.data.note
        })
      },
      uploadAvatar(param) {
        const formData = new FormData()
        formData.append('image', param.file)
        uploadImage(formData).then(resp => {
          let baseUrl = process.env.BASE_API
          this.user.icon = baseUrl + resp.data.url
          this.url = resp.data.url
        })
      },
      handleAvatarSuccess(res, file) {
        console.log(res)
        console.log(file)
        this.user.icon = res.data
      },
      handleBeforeUpload(file) {
        console.log(file)
      },
      save() {
        this.user.url = this.url
        updateUserInfo(this.user).then(resp => {
          if (resp.code === 200) {
            this.$message({
              type: "success",
              message: "更新成功"
            })
            this.reload()
          } else {
            this.$message({
              type: "success",
              message: "更新失败"
            })
          }
        })
      },
      // 修改密码
      update() {
        if (this.passwordForm.oldPassword === null || this.passwordForm.oldPassword === '' || this.passwordForm.newPassword
        === null || this.passwordForm.newPassword === '') {
        this.$message({type: 'warn', message: '密码不能为空'})
        }
        if (this.passwordForm.newPassword != this.passwordForm.confirmPassword) {
          this.$message({type: 'warn', message: '请确认新密码'})
        }
        
        // updatePassword(data).then(resp => {
        //   console.log(resp)
        // }) 
      },
      selectNav(navItem) {
        this.activeName = navItem
        switch (navItem) {
          case '个人资料':
            this.displayContent = 1
            
            break;
          case '修改密码':
            this.displayContent = 2
            
            break;
          default:
            this.displayContent = 1
            break;
        }
      },
    },
  }

</script>

<style>
  .view-nav {
    background-color: #fff;
    width: 100%;
    height: 50px;
    border-top: 1px solid #eee;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
    transition: all .2s;
    transform: translateZ(0);
  }

  .view-nav ul {
    max-width: 960px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    flex-direction: row;
    line-height: 50px;
  }

  .view-nav ul li {
    margin-left: 20px;
    font-size: 14px;
    color: #71777c;
    cursor: pointer;
    align-items: center;
  }
  .view-nav ul li:hover {
    color: #eeaaee;
  }
  .active {
    color: #eeaaee;
  }

  .setting-box {
    margin: 10px auto;
    width: 50%;
  }

  .setting-profile {
    background-color: #fff;
    padding: 10px 20px;
  }

  .setting-profile h2 {
    margin-bottom: 20px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }

  .setting-profile .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }

</style>
