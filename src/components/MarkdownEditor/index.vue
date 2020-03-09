<template>
  <div class="app-container">
    <el-form :label-position="'left'" :model="article" :rules="rules" label-width="60px">
      <el-form-item label="标 题" prop="title">
        <el-input v-model="article.title"></el-input>
      </el-form-item>
    </el-form>
    <mavon-editor ref="md" @save="save" @imgAdd="imgAdd" @imgDel="imgDel" v-model="article.content"
      :codeStyle="markdown.codeStyle" :toolbars="markdown.toolbars" />
    <br>
    <el-row>
      <el-col :span="2">
        <el-button @click="goback">返 回</el-button>
      </el-col>
      <el-col :span="2" :offset="20">
        <el-button type="primary" style="float: right;" @click="save">保 存</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {
    addArticle,
    uploadImage
  } from '@/api/article'

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
          articleId: null,
          title: "",
          content: '',
          contentHtml: null,
          type: 0
        },
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
        // lastSaveTime: null,
        timer: null
      }
    },
    created() {
      this.getArticle()
    },
    mounted() {
      this.timer = setInterval(this.intervalSave, 2 * 60 * 1000);
    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
    methods: {
      getArticle() { //获取文章内容
        let id = this.$route.query.a
        if (id == null) {
          this.markdownForm.contentMarkdown = ''
        } else {
          getMarkdownArticle(id).then(r => {
            this.markdownForm.contentMarkdown = r.data.contentMarkdown == null ? '' : r.data.contentMarkdown
            this.markdownForm.articleId = r.data.articleId
            this.markdownForm.title = r.data.title
            this.markdownForm.type = r.data.type
          }).catch(e => {
            console.log(e)
          })
        }
      },
      //保存文章内容
      save() { 
        console.log(this.article)
        // saveMarkdownArticle(this.markdownForm).then(resp => {
        //   this.$message.success("保存成功")
        //   this.markdownForm.articleId = resp.data.articleId
        //   this.lastSaveTime = new Date()
        // }).catch(e => {
        //   console.log(e)
        // })
      },
      //添加图片，pos为位置
      imgAdd(pos, file) { 
        let formData = new FormData();
        formData.append('image', file);
        uploadImage(formData).then(resp => {
          console.log(resp);
        })

        $vm = this.$refs.md
        markdownImg.base64Data = file.miniurl //获取图片base64内容
        markdownImg.type = file.type
        
        // uploadImg(markdownImg).then(r => {
        //   console.log(r)
        //   $vm.$img2Url(pos, process.env.VUE_APP_BASE_API + '/img/' + r.data)
        // }).catch(e => {
        //   console.log(e)
        // })
      },
      imgDel(pos, url) { //删除图片，并不是修改就会触发，仅支持工具栏操作
        console.log(pos)
        console.log(url)
      }
    }
  }

</script>

<style lang="scss">
  .app-container {
    margin: 20px 30px;
  }
  /* 设置编辑框最小高度 */
  .v-note-panel.shadow { 
    min-height: 500px;   
  }

</style>
