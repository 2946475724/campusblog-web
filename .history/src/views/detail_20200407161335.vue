<template>
  <div v-wechat-title="articleInfo.title">
    <NavBar></NavBar>
    <div class="main-container">
      <div class="main-content">
        <article class="info">
          <div class="detail">
            <h2 class="title">{{articleInfo.title}}</h2>
            <div class="article-metas">
              <span class="meta-item">
                <svg-icon icon-class="user" class="icon-size"></svg-icon> {{articleInfo.username}}
              </span>
              <span class="meta-item">
                <svg-icon icon-class="time" class="icon-size"></svg-icon> {{articleInfo.createTime | dateFormat}}
              </span>
              <span class="meta-item">
                <svg-icon icon-class="view" class="icon-size"></svg-icon> {{articleInfo.views}}
              </span>
            </div>
            <!-- <div class="article-content markdown-body" codeStyle="monokai" v-html="articleInfo.contentHtml">
              {{articleInfo.contentHtml}}
            </div> -->
            <mavon-editor style="box-shadow: '';" class="article-content markdown-body" codeStyle="monokai" v-html="articleInfo.contentHtml" />
            <div class="tool-box">
              <span class="tool-box-item">
                <svg-icon icon-class="like"></svg-icon>
              </span>
              <span class="tool-box-item">
                <svg-icon icon-class="like"></svg-icon>
              </span>
            </div>
          </div>
          <div class="comment" style="background-color: #fff;">
            <!-- 评论输入框 -->
            <CommentBox :userInfo="userInfo" :commentInfo="commentInfo" @submit-box="submitBox" :showCancel="showCancel"></CommentBox>
            <!-- 评论回复列表 -->
            <div class="comment-list">
              <CommentList :comments="comments" :commentInfo="commentInfo"></CommentList>
              <div class="no-comment" v-if="comments.length ==0">
                还没有评论，快来抢沙发吧！
              </div>
            </div>
          </div>
        </article>
      </div>
      <SideBar></SideBar>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import "mavon-editor/dist/css/index.css";
  import NavBar from "../components/NavBar";
  import SideBar from "../components/SideBar";
  import CommentBox from '../components/CommentBox';
  import CommentList from '../components/CommentList';
  import Footer from '../components/Footer'
  import {getArticleById} from '@/api/article';
  import {mapMutations} from 'vuex'
  import {addComment, getCommentList} from "../api/comment";
  import { Loading } from 'element-ui';
  import marked from 'marked'
  export default {
    name: 'Detail',
    components: {
      NavBar,
      SideBar,
      CommentBox,
      CommentList,
      Footer,
    },
    data() {
      return {
        id: this.$route.params.id,  //文章id
        articleInfo: "",
        loadingInstance: null,  //loading对象
        showCancel: false,
        comments: [],
        commentInfo: {
          type: 1,
          articleId: this.$route.params.id
        },
        toInfo: {},
        userInfo: {},
      }
    },
    created() {
      // this.loadingInstance = Loading.service({
      //   fullscreen: true,
      //   text: '正在努力加载中~'
      // });
      this.getArticleById();
      this.getCommentList();
    },
    methods: {
      ...mapMutations(['SET_COMMENT_LIST']),
      //通过id获取文章信息
      getArticleById() {
        getArticleById(this.id).then(resp => {
          this.articleInfo = resp.data;
          console.log(resp.data);
        })
      },
      submitBox(e) {
        let params = {};
        params.articleId = e.articleId;
        params.type = e.type;
        params.userId = e.userId;
        params.content = e.content;
        addComment(params).then(resp => {
          if(resp.code === 200) {
            this.$notify({
              title: '成功',
              message: "发表成功~",
              type: 'success',
              offset: 100
            });
          } else {
              this.$notify.error({
              title: '错误',
              message: response.data,
              offset: 100
            });
          }
          this.getCommentList();
        })
      },
      //获取评论列表
      getCommentList() {
        let params = {};
        params.articleId = this.commentInfo.articleId;
        params.type = this.commentInfo.type;
        getCommentList(params).then(resp => {
          if (resp.code === 200) {
            this.comments = resp.data;
            this.SET_COMMENT_LIST(this.comments);
          }
        })
      },
    },
  }

</script>

<style>
  .detail {
    padding: 5px 30px 30px;
    overflow: hidden;
    height: auto;
    transition: height .25;
    margin-bottom: 10px;
    background-color: #fff;
  }
  .detail > .title {
    margin: 16px 0 25px;
    text-align: center;
    font-weight: 700;
    font-size: 25px;
  }
  .article-metas {
    margin: 10px 0 20px;
  }
  .meta-item {
    margin-right: 10px;
    font-size: 12px;
  }
  .tool-box {
    display: flex;
  }
  .tool-box-item {
    display: block;
    margin-right: 10px;
    height: 40px;
    width: 80px;
    background-color: #eaeaea;
  }
  .comment {
    background-color: #fff;
    overflow:hidden;
    zoom:1;
  }

  .comment-list {
    padding: 0 24px;
  }

  .no-comment {
  width: 100%;
  text-align: center;
  }
  
</style>
