<template>
  <div class="editor">
    <div class="editor-top">
      <input class="input" v-model="article.title" placeholder="请输入文章标题" />
      <button class="btn editor-type" @click="changeEditor(article.type)">切换编辑器</button>
    </div>
    <!-- 富文本编辑器 -->
    <div v-if="article.type === 0">
      <transition name="el-fade-in-linear">
        <quillEditor v-model="content" ref="vueQuillEditor" :options="editorOption" @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)" @change="onEditorChange($event)">
        </quillEditor>
      </transition>
    </div>
    <!-- Markdown编辑器 -->
    <div v-if="article.type === 1">
      <transition name="el-fade-in-linear">
        <MarkdownEditor></MarkdownEditor>
      </transition>
    </div>
    <div class="editor-bottom">
      <el-button @click="goback" size="small">返 回</el-button>
      <el-button type="primary" style="float: right;" @click="submit" size="small">发 布</el-button>
    </div>
    <!-- 弹出对话框 -->
    <el-dialog title="发布文章" :visible.sync="dialogVisible" width="30%">
      <el-form :label-position="'left'" :model="article" :rules="rules" ref="article" label-width="90px">
        <el-form-item label="封面图片" prop="coverImage">
          <el-upload :action="upLoadUrl" :on-success="handleSuccess" :file-list="fileList" name="image"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="文章摘要" prop="summary">
          <el-input v-model="article.summary" :rows="4" type="textarea" placeholder="请输入摘要..."></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="categoryId">
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
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="publish('article')" size="small">发 布</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import MarkdownEditor from '@/components/MarkdownEditor'
  import {
    addArticle,
    uploadImage
  } from '@/api/article'
  import { quillEditor } from "vue-quill-editor"; //调用编辑器
  // 引入样式，此时样式是直接从quill文件中直接引入
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import {
    getCategoryList
  } from '@/api/category'
  export default {
    name: "Editor",
    components: {
      MarkdownEditor,
      quillEditor
    },
    data() {
      return {
        article: {
          articleId: "",
          userId: "",
          title: "",
          coverImage: "",
          summary: "",
          content: '',
          contentHtml: "",
          tags: "",
          status: 1,
          categoryId: "",
          type: 0,
        },
        categories: [],
        name: "",
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        rules: {
          coverImage: [{
            required: true,
            message: '请选择封面图'
          }],
          summary: [{
            required: true,
            message: '请输入摘要',
            trigger: 'blur'
          }],
          categoryId: [{
            required: true,
            message: '请选择文章分类'
          }]
        },
        dialogVisible: false,
        upLoadUrl: "http://localhost:8081/file/uploadImage",
        fileList: [],
      }
    },
    created() {
      this.getCategoryList();
    },
    computed: {
      editor() {
      return this.$refs.vueQuillEditor.quill;
    }
    },
    methods: {
      //获取文章分类
      getCategoryList() {
        getCategoryList().then(resp => {
          console.log(resp.data)
          this.categories = resp.data
        })
      },
      changeEditor(val) {
        val === 0 ? this.article.type = 1 : this.article.type = 0
      },
      // 失去焦点事件
      onEditorBlur() { }, 
      // 获得焦点事件
      onEditorFocus() { }, 
      // 内容改变事件
      onEditorChange({ quill, html, text }) {
        console.log(text)
       }, 
      //返回
      goback() {
        this.$router.go(-1);
      },
      //发布按钮
      submit() {
        if (this.article.title === null || this.article.title === "") {
          this.$message({
            type: "warning",
            message: "标题不能为空"
          })
        }else {
          this.dialogVisible = true
        }
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
      }, //标签输入
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
      publish(article) {
        this.article.userId = this.$store.state.user.userInfo.id;
        this.article.tags = this.dynamicTags.join(',');
        console.log("上传内容：", this.article);
        this.$refs[article].validate((valid) => {
          if (valid) {
            addArticle(this.article).then(resp => {
              this.dialogVisible = false;
              console.log(resp)
            })
          }
        })
      },
    },

  }

</script>

<style>
  .editor {
    display: flex;
    justify-content: center;
    margin: 10px 20px;
    flex-direction: column;
  }

  .editor-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .editor input {
    border: 1px solid #dcdfe6;
    background-color: #fff;
    border-radius: 5px;
    line-height: 40px;
    height: 40px;
    flex-grow: 1;
  }

  .editor-type {
    margin-left: 10px;
  }
  .editor-bottom {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }

  .edit_container {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .ql-editor {
  height: 600px;
  }

  .el-tag+.el-tag {
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
