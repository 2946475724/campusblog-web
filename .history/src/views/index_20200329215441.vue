<template>
  <div>
    <!-- 顶部导航栏 -->
    <NavBar></NavBar>
    <div class="main-container">
      <div class="main-content">
        <div class="article-list">
          <div class="article-list-item" v-for="article in articleList" :key="article.id">
            <div class="item-content">
              <div class="item-pic"> 
                <img :src="article.coverImage" />
              </div>
              <div class="item-body">
                <a href="javascript:void(0);" @click="gotoInfo(article.id)">
                  <h2 class="item-title">{{article.title}}</h2>
                </a>
                <p class="item-description">
                  {{article.summary | strFilter}}
                </p>
                <div class="item-meta">
                  <span class="date">
                    <i class="el-icon-date"></i>
                    <span>{{article.createTime | dateFormat}}</span>
                  </span>
                  <span class="views">
                    <i class="el-icon-view"></i>
                    <span>{{article.views === null ? 0 : article.views}}</span>
                  </span>
                  <span class="views">
                    <i class="el-icon-chat-dot-round"></i>
                    <span>{{article.comment}}</span>
                  </span>
                  <span class="views">
                    <svg-icon icon-class="category" class="color-main"></svg-icon>
                    <span>{{article.categoryName}}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SideBar></SideBar>
    </div>
    <ScrollTop></ScrollTop>
    <Footer></Footer>
  </div>
</template>

<script>
  import NavBar from "../components/NavBar";
  import Footer from '../components/Footer'
  import SideBar from "../components/SideBar";
  import ScrollTop from '../components/ScrollTop';
  import { fetchList } from "@/api/article";
  export default {
    name: "index",
    components: {
      NavBar,
      SideBar,
      ScrollTop,
      Footer,
    },
    data() {
      return {
        articleList: [],
      };
    },
    created() {
      this.getArticleList();
    },
    methods: {
      getArticleList() {
        fetchList().then(response => {
          this.articleList = response.data.list;
          console.log(response.data.list);
        })
      },
      //跳转文章详情页
      gotoInfo(id) {
        console.log(id);
        let routeData = this.$router.push({
          path: `/info/${id}`,
        })
      },
    },
    filters: {
      strFilter(value) {
        if(value && value.length > 50) {
          value = value.substring(0,50)+'...';
        }
        return value;
      }
    },
  };
</script>

<style scoped>
  .main-container {
    margin-top: 10px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .main-content {
    width: 800px;
  }

  .article-list-item {
    margin-bottom: 10px;
  }

  .item-content {
    display: flex;
    flex-direction: row;
    overflow: hidden;
    height: 150px;
    padding: 10px;
    background-color: #fff;
  }

  .item-pic {
    width: 200px;
    height: 150px;
    transform: scale(1.1);
  }

  .item-pic:hover img {
    width: 200px;
    height: 150px;
    transition: all 0.6s ease;
  }

  .item-body {
    margin-left: 10px;
    width: 100%;
  }

  .item-title {
    margin-top: 3px;
    margin-bottom: 5px;
    font-weight: 700;
  }

  .item-description {
    margin-top: 10px;
    height: 80px;
    font-size: 13px;
    overflow: hidden;
    margin-bottom: 10px;
    word-wrap: break-word;
  }

  .item-meta {
    height: 15px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    overflow: hidden;
    word-wrap: normal;
    white-space: nowrap;
    font-size: 12px;
  }
</style>
