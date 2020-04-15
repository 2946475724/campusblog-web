<template>
  <div>
    <el-form :label-position="'left'" :model="article" :rules="rules" ref="article" label-width="90px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="article.title" placeholder="请输入文章标题"></el-input>
        <div>切换编辑器</div>
      </el-form-item>
    </el-form>
    <MarkdownEditor></MarkdownEditor>
    <el-row type="flex" justify="end">
      <el-col :span="1">
        <el-button @click="goback" size="small">返 回</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" style="float: right;" @click="dialogVisible=true" size="small">发 布</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import MarkdownEditor from '@/components/MarkdownEditor'
  export default {
    name: "Editor",
    components: {
      MarkdownEditor,
    },
    data() {
      return {

      }
    },
  }

</script>

<style>

</style>
