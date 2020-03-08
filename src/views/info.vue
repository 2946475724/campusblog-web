<template>
  <div>
    <top></top>
    <div class="main-container">
      <div class="main-content">
        <article class="info">
          <div class="detail">
            <h2 class="title">{{articleInfo.title}}</h2>
            <div class="article-content">{{articleInfo.content}}</div>
          </div>
          <div class="comment" style="background-color: #fff;">
            <!-- <sticky :sticky-top="60"> -->
              <CommentBox :userInfo="userInfo" :commentInfo="commentInfo" @submit-box="submitBox"
                :showCancel="showCancel"></CommentBox>
            <!-- </sticky> -->
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
  </div>
</template>

<script>
  import Top from "../components/Top";  
  import SideBar from "../components/SideBar";
  import CommentBox from '../components/CommentBox';
  import CommentList from '../components/CommentList';
  import Sticky from '../components/Sticky'
  import {getArticleById} from '@/api/article';
  import {mapMutations} from 'vuex'
  import {addComment, getCommentList} from "../api/comment";
  import { Loading } from 'element-ui';
  export default {
    name: 'Info',
    components: {
      Top,
      SideBar,
      CommentBox,
      Sticky,
      CommentList,
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
    padding: 5px 20px;
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
    font-size: 19px;
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
