<template>
  <div>
    <NavBar></NavBar>
    <div class="setting-box">
      <div class="setting-profile">
        <h2>个人资料</h2>
        <el-form :model="user" label-width="100px" label-position="left">
          <el-form-item label="头像">
            <el-upload 
              action="http://localhost:8080/file/uploadImage"
              name="image"
              :show-file-list="false"
              :http-request="uploadAvatar"
              :on-success="handleAvatarSuccess"
              :before-upload="handleBeforeUpload"
              class="avatar-uploader">
              <img v-if="user.icon" :src=user.icon class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="user.username" placeholder="填写你的用户名" size="small" style="width: 50%;"></el-input>
          </el-form-item>
          <el-form-item label="个人简介">
            <el-input v-model="user.note" placeholder="填写你的介绍" size="small" style="width: 50%;"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" size="small" @click="">保存</el-button>
      </div>
    </div>

  </div>
</template>

<script>
  import NavBar from '@/components/NavBar'
  import SingleUpload from '@/components/Upload/singleUpload'
  import {uploadImage} from '@/api/file'
  import {getUserInfo} from '@/api/user'
  export default {
    name: 'setting',
    components: {
      NavBar,
      SingleUpload,
    },
    data() {
      return {
        user: {
          username: "",
          icon: "",
        },
      }
    },
    created() {
      this.getUserInfo();
    },
    methods: {
      getUserInfo() {
        getUserInfo().then(resp => {
          console.log(resp.data)
          this.user = resp.data
        })
      },
      uploadAvatar(param) {
        const formData = new FormData()
        formData.append('image', param.file)
        uploadImage(formData).then(resp => {
          console.log("上传成功", resp.data)
          let baseUrl = process.env.BASE_API
          this.user.icon = `baseUrl + resp.data.url`
          console.log("上传成功", this.user.icon)

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
    },
  }

</script>

<style>
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
