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
          <div class="comment">
            <div class="comment-box">
              <div class="user-avatar">
                <img src="../../static/images/default.jpg"/>
              </div>
              <div class="editor">
                <textarea class="editor-input" placeholder="说点什么吧..."></textarea>
                <div class="post">
                  <div class="right">
                    <button class="btn submit">发布</button>
                  </div>
                </div>
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
  import {getArticleById} from '@/api/article';
  export default {
    name: 'Info',
    components: {
      Top,
      SideBar
    },
    data() {
      return {
        id: this.$route.params.id,
        articleInfo: "",
      }
    },
    created() {
      this.getArticleById();
    },
    methods: {
      //通过id获取文章信息
      getArticleById() {
        getArticleById(this.id).then(resp => {
          this.articleInfo = resp.data;
          console.log(resp.data);
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
  .user-avatar > img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid #eee;
  }
  .editor {
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
  .editor > .post {
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
