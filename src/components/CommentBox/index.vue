<template>
  <div class="comment-box">
    <div class="user-avatar"> 
      <img :src="getUserAvatar" />
    </div>
    <div class="editor">
      <textarea class="editor-input" placeholder="说点什么吧..." v-model="value" @input="vaildCount"></textarea>
      <div class="post">
        <div class="right">
          <span style="font-size: 13px;">还能输入{{count}}个字符</span>
          <button class="btn submit" @click="handleSubmit">发布</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    name: 'CommentBox',
    props: {
      userInfo: {type: Object},
      toInfo: {type: Object},  //回复对象
      commentInfo: {type: Object}, //文章信息
      showCancel: {type: Boolean, default: true}
    },
    data() {
      return {
        comments: [],
        value: '',
        user: {},
        count: 255,
      }
    },
    computed: {
      ...mapGetters(['getUserAvatar'])
    },
    methods: {
      vaildCount() {
        let count = 255 - this.value.length;
        if(count <= 0) {
          this.count = 0;
        } else {
          this.count = count;
        }
      },
      handleSubmit() {
        let info = this.$store.state.user.userInfo;
        let isLogin = this.$store.state.user.isLogin;
        console.log("是否登录", isLogin);
        if(!isLogin) {
          this.$notify.error({
            title: '警告',
            message: '登录后才可以评论哦~',
            offset: 100,
          })
          return;
        }
        if(this.value === "") {
          this.$notify.error({
            title: '警告',
            message: '评论内容不能为空哦~',
            offset: 100,
          })
          return;
        }

        let userId = info.id;
        let toUserId = "";
        let toCommentId = "";
        let articleId = "";
        let type = "";
        let content = this.value;
        if (this.toInfo) {
          toUserId = this.toInfo.id;
          toCommentId = this.toInfo.commentId;
        }
        if (this.commentInfo) {
          articleId = this.commentInfo.articleId;
          type = this.commentInfo.type;
        }

        this.comments = {
          userId: userId,
          toCommentId: toCommentId,
          toUserId: toUserId,
          content: content,
          articleId: articleId,
          type: type,
          reply: []
        }

        this.value = '';
        this.count = 255;
        this.$emit("submit-box", this.comments);
      },
    },
  }

</script>

<style scope>
  .comment-box {
    display: flex;
    padding: 20px 24px;
    background-color: #fff;
  }

  .user-avatar {
    display: block;
    margin-bottom: 30px;
    width: 50px;
    height: 50px;
    margin-right: 15px;
  }

  .user-avatar>img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid #eee;
  }

  .comment-box .editor {
    flex-grow: 1;
  }

  .editor-input {
    padding: 12px 16px;
    width: 95%;
    border-radius: 4px;
    background-color: #fafafa;
    display: inline-block;
    height: 80px;
    font-size: 13px;
    vertical-align: top;
    resize: none;
    color: #999;
    border: 1px solid #eee;
    outline: none;
  }

  .editor>.post {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }

  .editor .post .submit {
    color: #fff;
    background-color: #ec7259;
    border-color: #ec7259;
    outline: none;
  }

</style>
