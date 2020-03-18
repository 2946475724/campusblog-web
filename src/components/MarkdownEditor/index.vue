<template>
  <div class="app-container">
    <el-form :label-position="'left'" :model="article" :rules="rules" ref="article" label-width="80px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="article.title" placeholder="请输入文章标题"></el-input>
      </el-form-item>
    </el-form>
    <mavon-editor ref="md" @change="change" @imgAdd="imgAdd" @imgDel="imgDel" v-model="article.content"
      :codeStyle="markdown.codeStyle" :toolbars="markdown.toolbars" />
    <br>
    <el-row type="flex" justify="end">
      <el-col :span="1">
        <el-button @click="goback" >返 回</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" style="float: right;" @click="dialogVisible=true">发 布</el-button>
      </el-col>
    </el-row>
    <el-dialog title="发布文章" :visible.sync="dialogVisible" width="30%" >
      <el-form :model="article">
        <el-form-item label="封面图片">
          <el-upload :action="upLoadUrl"
            :on-success="handleSuccess" :file-list="fileList" name="image" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="文章分类">
          <el-select v-model="name" size="small" @change="selectChange" placeholder="请选择">
            <el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章标签">
          <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
            @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加标签</el-button>
        </el-form-item>
        <el-form-item label="是否发布">
          <el-radio-group @change="radioChange" v-model="article.status">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="publish" >发 布</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    addArticle,
    uploadImage,
  } from '@/api/article'
  import {getList} from '@/api/category'
  export default {
    data() {
      return {
        markdown: {
          codeStyle: 'atom-one-dark',
          toolbars: {
            bold: true, // 粗体
            italic: true, // 斜体
            header: true, // 标题
            underline: true, // 下划线
            strikethrough: true, // 中划线
            mark: true, // 标记
            superscript: true, // 上角标
            subscript: true, // 下角标
            quote: true, // 引用
            ol: true, // 有序列表
            ul: true, // 无序列表
            link: true, // 链接
            imagelink: true, // 图片链接
            code: true, // code
            table: true, // 表格
            fullscreen: true, // 全屏编辑
            readmodel: true, // 沉浸式阅读
            htmlcode: true, // 展示html源码
            help: true, // 帮助
            /* 1.3.5 */
            undo: true, // 上一步
            redo: true, // 下一步
            trash: true, // 清空
            save: true, // 保存（触发events中的save事件）
            /* 1.4.2 */
            navigation: true, // 导航目录
            /* 2.1.8 */
            alignleft: true, // 左对齐
            aligncenter: true, // 居中
            alignright: true, // 右对齐
            /* 2.2.1 */
            subfield: true, // 单双栏模式
            preview: false, // 预览
          }
        },
        article: {
          articleId: "",
          userId: "",
          title: "",
          coverImage: "",
          content: '',
          contentHtml: "",
          tags: "",
          status: 1,
          categoryId: ""
        },
        categories: [],
        name: "",
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        rules: {
          title: [{
              required: true,
              message: '请输入标题',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 80,
              message: '长度在1到80个字符',
              trigger: 'blur'
            }
          ]
        },
        dialogVisible: false,
        upLoadUrl: "http://localhost:8081/file/uploadImage",
        fileList: [],
      }
    },
    created() {
      this.getCategoryList();
      // this.getArticle()
      
    },
    methods: {
      //获取文章内容
      // getArticle() { 
      //   let id = this.$route.query.a
      //   if (id == null) {
      //     this.markdownForm.contentMarkdown = ''
      //   } else {
      //     getMarkdownArticle(id).then(r => {
      //       this.markdownForm.contentMarkdown = r.data.contentMarkdown == null ? '' : r.data.contentMarkdown
      //       this.markdownForm.articleId = r.data.articleId
      //       this.markdownForm.title = r.data.title
      //       this.markdownForm.type = r.data.type
      //     }).catch(e => {
      //       console.log(e)
      //     })
      //   }
      // },
      //实时获取转成HTML的数据
      change(value, render) {
        this.article.contentHtml = render
        console.log(this.article.contentHtml)
      },
      //将图片上传到服务器，返回地址替换到md中，pos为位置
      imgAdd(pos, file) { 
        let formData = new FormData();
        formData.append('image', file);
        uploadImage(formData).then(resp => {
          console.log(resp);
          //将返回的url替换到文本原位置
          this.$refs.md.$img2Url(pos, resp.data)
        })
      },
      imgDel(pos, url) { //删除图片，并不是修改就会触发，仅支持工具栏操作
        console.log(pos)
        console.log(url)
      },
      //获取文章分类
      getCategoryList() {
        getList().then(resp => {
          console.log(resp.data)
          this.categories = resp.data
        })
      },
      //返回
      goback() {
        this.$router.go(-1);
      },
      //封面图片上传成功
      handleSuccess(response, file, fileList) {
        console.log(response);
        this.article.coverImage = response.data;
      },
      //选中的改变事件
      selectChange(value) {
        console.log(value);
        for (let i = 0; i < this.categories.length; i++) {
          if (this.categories[i].name === value) {
            this.article.categoryId = this.categories[i].id;
            console.log(this.article.categoryId);
          }
        }
      },
      //标签输入
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      radioChange(value) {
        console.log(value)
        this.article.status = value
      },
      //发布文章
      publish() {
        this.dialogVisible = false;
        this.article.userId = this.$store.state.user.userInfo.id;
        this.article.tags = this.dynamicTags.join(',');
        console.log("上传内容：",this.article);
        addArticle(this.article).then(resp => {
          console.log(resp)
        })
      },
    }
  }

</script>

<style lang="scss">
  .app-container {
    margin: 20px 30px;
  }
  /* 设置编辑框最小高度 */
  .v-note-wrapper.shadow {
    min-height: 600px;   
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    /* margin-left: 10px; */
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
