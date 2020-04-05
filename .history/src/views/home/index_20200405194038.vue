<template>
  <div>
    <!-- 顶部导航栏 -->
    <NavBar></NavBar>
    <div class="slider">
      <el-carousel indicator-position="outside" height="500px">
        <el-carousel-item v-for="item in list" :key="item">
          <h2>{{item.name}}</h2>
          <el-image :src="item.pic" fit="cover"></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="main-container">
      <div class="main-content">
        <List></List>
      </div>
      <SideBar></SideBar>
    </div>
    <ScrollTop></ScrollTop>
    <Footer></Footer>
  </div>
</template>

<script>
  import NavBar from "@/components/NavBar";
  import Footer from '@/components/Footer'
  import SideBar from "@/components/SideBar";
  import ScrollTop from '@/components/ScrollTop';
  import List from '@/views/home/list'
  import {
    fetchList
  } from "@/api/article";
  export default {
    name: "home",
    components: {
      NavBar,
      List,
      SideBar,
      ScrollTop,
      Footer,
    },
    data() {
      return {
        articleList: [],
        list: [
          {
            name: "balabala",
            pic: "/static/images/demo2.jpg"
          },
          {
            name: "balabala",
            pic: "/static/images/demo3.jpg"
          },
          {
            name: "balabala",
            pic: "/static/images/demo4.jpg"
          }
        ],
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
          path: `/detail/${id}`,
        })
      },
    },
    filters: {
      strFilter(value) {
        if (value && value.length > 50) {
          value = value.substring(0, 50) + '...';
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
    overflow: hidden;
  }

  .item-pic img {
    width: 200px;
    height: 150px;
    transition: all 0.6s ease;
  }

  .item-pic img:hover {
    transform: scale(1.1);
  }

  .item-body {
    margin-left: 10px;
    flex-grow: 1;
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
