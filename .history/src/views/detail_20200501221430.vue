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
              <span :style="{display:[loginUserInfo.id === articleInfo.userId ? 'none' : 'inline-block']}">
                <button v-if="isFollow === true" class="btn unFollow-btn" @click="unFollow">已关注</button>
                <button v-else class="btn follow-btn" @click="follow">关注</button>
              </span>
            </div>
            <div v-if="articleInfo.type === 0" class="article-content" v-html="articleInfo.content"></div>
            <mavon-editor v-if="articleInfo.type === 1" style="box-shadow: '';z-index: 0;"
              class="article-content markdown-body" codeStyle="monokai" v-html="articleInfo.contentHtml" />
            <div class="tag-box" v-if="tagList != ''">
              <div class="tag-item" v-for="(item, index) in tagList" :key="index">{{item}}</div>
            </div>
            <div class="tool-box">
              <span class="tool-box-item" @click="like">
                <svg-icon v-if="this.token != undefined && articleInfo.likeStatus === 1" icon-class="like-active"
                  class="icon-size"></svg-icon>
                <svg-icon v-else icon-class="like" class="icon-size"></svg-icon>
                点赞{{articleInfo.likes}}
              </span>
              <span class="tool-box-item" @click="collection">
                <svg-icon v-if="this.token != undefined && articleInfo.collectionStatus === 1" icon-class="collection-active"
                  class="icon-size"></svg-icon> 
                <svg-icon v-else icon-class="collection" class="icon-size"></svg-icon>
                收藏{{articleInfo.collections}}
              </span>
            </div>
          </div>
          <div class="comment" style="background-color: #fff;">
            <!-- 评论输入框 -->
            <CommentBox :userInfo="userInfo" :commentInfo="commentInfo" @submit-box="submitBox"
              :showCancel="showCancel"></CommentBox>
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
    <ScrollTop></ScrollTop>
  </div>
</template>

<script>
  import "mavon-editor/dist/css/index.css";
  import NavBar from "../components/NavBar";
  import SideBar from "../components/SideBar";
  import CommentBox from '../components/CommentBox';
  import CommentList from '../components/CommentList';
  import Footer from '../components/Footer'
  import ScrollTop from '@/components/ScrollTop';
  import {
    getArticleById,
    likeArticle,
    collectArticle
  } from '@/api/article';
  import {
    follow,
    unFollow
  } from '@/api/user'
  import {
    mapMutations
  } from 'vuex'
  import {
    addComment,
    getCommentList
  } from "../api/comment";
  import {
    Loading
  } from 'element-ui';
  import {
    getToken,
    setToken,
    removeToken
  } from '@/utils/auth';
  import marked from 'marked'
  import {
    getUserInfo,
    getFollowIds
  } from '@/api/user'
  export default {
    name: 'Detail',
    components: {
      NavBar,
      SideBar,
      CommentBox,
      CommentList,
      Footer,
      ScrollTop,
    },
    data() {
      return {
        id: this.$route.params.id, //文章id
        articleInfo: "",
        loadingInstance: null, //loading对象
        showCancel: false,
        comments: [],
        commentInfo: {
          type: 1,
          articleId: this.$route.params.id
        },
        toInfo: {},
        userInfo: {},
        tagList: [],
        isLike: 0,
        token: '',
        loginUserInfo: {},
        isFollow: false,
      }
    },
    created() {
      this.getArticleById();
      this.getCommentList();
      this.token = getToken('token')
      this.getUserInfo();
    },
    methods: {
      ...mapMutations(['SET_COMMENT_LIST']),
      // 获取用户信息
      getUserInfo() {
        if (this.token != undefined || this.token != null) {
          getUserInfo().then(resp => {
            this.loginUserInfo = resp.data
            this.getFollowIds()
          })
        }
      },
      //通过id获取文章信息
      getArticleById() {
        getArticleById(this.id).then(resp => {
          this.articleInfo = resp.data;
          this.tagList = resp.data.tags.split(',')
        })
      },
      // 发表评论
      submitBox(e) {
        let params = {};
        params.articleId = e.articleId;
        params.type = e.type;
        params.userId = e.userId;
        params.content = e.content;
        addComment(params).then(resp => {
          if (resp.code === 200) {
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
      //点赞
      like() {
        let token = getToken('token');
        if (token === undefined || token === null) {
          this.$message({
            type: 'error',
            message: '请先登录'
          })
          return;
        }
        if (this.articleInfo.likeStatus === 0 || this.articleInfo.likeStatus === null) {
          this.articleInfo.likeStatus = 1
          this.articleInfo.likes += 1
        } else {
          this.articleInfo.likeStatus = 0
          this.articleInfo.likes -= 1
        }
        let data = {
          articleId: this.id,
          userId: this.loginUserInfo.id,
          status: this.articleInfo.likeStatus
        }
        likeArticle(data).then(resp => {
          console.log(resp)
        })
      },
      // 收藏
      collection() {
        let token = getToken('token');
        if (token === undefined || token === null) {
          this.$message({
            type: 'error',
            message: '请先登录'
          })
          return;
        }
        if (this.articleInfo.collectionStatus === 0 || this.articleInfo.collectionStatus === null) {
          this.articleInfo.collectionStatus = 1
          this.articleInfo.collections += 1
        } else {
          this.articleInfo.collectionStatus = 0
          this.articleInfo.collections -= 1
        }
        let data = {
          articleId: this.id,
          userId: this.loginUserInfo.id,
          status: this.articleInfo.collectionStatus
        }
        collectArticle(data).then(resp => {
          console.log(resp)
        })
      },
      // 获取用户关注的id
      getFollowIds() {
        if (this.token != undefined) {
          let data = {
            userId: this.loginUserInfo.id
          }
          getFollowIds(data).then(resp => {
            let follows = resp.data.follows
            follows.forEach(follow => {
              if (this.articleInfo.userId.toString() === follow) {
                this.isFollow = true
              }
            });
          })
        }
      },
      // 关注
      follow() {
        let token = getToken('token');
        if (token === undefined || token === null) {
          this.$message({
            type: 'error',
            message: '请先登录'
          })
          return;
        }
        let data = {
          userId: this.loginUserInfo.id,
          followingId: this.articleInfo.userId
        }
        follow(data).then(resp => {
          if (resp.code === 200) {
            this.$message("关注成功")
            this.isFollow = true
          }
        })
      },
      // 取消关注
      unFollow() {
        let data = {
          userId: this.loginUserInfo.id,
          followingId: this.articleInfo.userId
        }
        unFollow(data).then(resp => {
          if (resp.code === 200) {
            this.$message("取消关注")
            this.isFollow = false
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

  .detail>.title {
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

  .follow-btn {
    font-size: 12px;
    background-color: #fff;
  }

  .follow-btn:hover {
    background-color: #eaeaea;
  }

  .unFollow-btn {
    font-size: 12px;
    background-color: #eaeaea;
  }

  .tag-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 20px 0;
  }

  .tag-box .tag-item {
    line-height: 33px;
    font-size: 13px;
    height: 33px;
    overflow: hidden;
    margin-left: 5px;
    background: rgba(0, 132, 255, .1);
    border-radius: 100px;
    padding: 0 20px;
  }

  .tool-box {
    display: flex;
    margin-top: 30px;
  }

  .tool-box-item {
    display: block;
    margin-right: 10px;
    height: 35px;
    line-height: 35px;
    width: 80px;
    padding: 0 10px;
    background-color: #eaeaea;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
  }

  .comment {
    background-color: #fff;
    overflow: hidden;
    zoom: 1;
  }

  .comment-list {
    padding: 0 24px;
  }

  .no-comment {
    width: 100%;
    text-align: center;
  }

</style>
