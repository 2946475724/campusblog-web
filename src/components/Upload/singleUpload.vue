<template>
  <div>
    <el-upload :action="ossUploadUrl" :data="dataObj" list-type="picture" :multiple="false"
      :show-file-list="showFileList" :file-list="fileList" :before-upload="beforeUpload" :on-remove="handleRemove"
      :on-success="handleUploadSuccess" :on-preview="handlePreview">
      <el-button type="primary" size="small">点击上传</el-button>
    </el-upload>
    <!-- <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="fileList[0].url" alt="">
    </el-dialog> -->
  </div>
</template>

<script>
  import {policy} from '@/api/oss'
  export default {
    name: "singleUpload",
    data() {
      return {
        dataObj: {
          policy: "",
          signature: "",
          key: "",
          OSSAccessKeyId: "",
          dir: "",
          host: "",
          callback: "",
        },
        // dialogVisible: false,
        ossUploadUrl: 'http://campusblog.oss-cn-shanghai.aliyuncs.com',
      }
    },
    // props: {
    //   value: string
    // },
    computed: {
      imageUrl() {
        return this.value;
      },
      imageName() {
        if (this.value != null && this.value !== '') {
          return this.value.substr(this.value.lastIndexOf("/") + 1);
        } else {
          return null;
        }
      },
      fileList() {
        return [{
          name: this.imageName,
          url: this.imageUrl
        }]
      },
      showFileList: {
        get: function () {
          return this.value !== null && this.value !== ''&& this.value!==undefined;
        },
        set: function (newValue) {
      }
      }
    },
    methods: {
      emitInput(val) {
        this.$emit('input', val)
      },
      handleRemove(file, fileList) {
        this.emitInput('')
      },
      beforeUpload(file) {
        let _self = this;
        return new Promise((resolve, reject) => {
          policy().then(resp => {
             _self.dataObj.policy = resp.data.policy;
             _self.dataObj.signature = resp.data.signature;
             _self.dataObj.OSSAccessKeyId = resp.data.accessKeyId;
             _self.dataObj.key = resp.data.dir + '/${filename}';
             _self.dataObj.dir = resp.data.dir;
             _self.dataObj.host = resp.data.host;
             _self.dataObj.callback = resp.data.callback;
             resolve(true)
          }).catch(err => {
            console.log(err)
            reject(false)
          })
        })
      },
      handleUploadSuccess(res, file) {
        this.showFileList = true;
        this.fileList.pop();
        let url = this.dataObj.host + '/' + this.dataObj.dir + '/' + file.name;
        console.log(url)
        this.fileList.push({name: file.name, url: url});
        this.emitInput(this.fileList[0].url);
      }
    },
  }

</script>
