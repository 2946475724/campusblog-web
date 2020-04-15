<template>
  <div>
    <!-- 顶部导航栏 -->
    <NavBar></NavBar>
    <!-- banner轮播图 -->
    <div class="slider">
      <el-carousel :height="bannerHeight + px">
        <el-carousel-item v-for="item in bannerList" :key="item">
          <div class="banner">
            <img :src="item.pic" />
          </div>
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
        bannerHeight: 300,
        bannerList: [
          {
            pic: "/static/images/banner1.png"
          },
          {
            pic: "/static/images/banner2.jpg"
          },
          {
            pic: "/static/images/banner3.png"
          }
        ],
      };
    },
    mounted() {
    },
    created() {
      // this.getArticleList();
    },
    methods: {
      // getArticleList() {
      //   fetchList().then(response => {
      //     this.articleList = response.data.list;
      //     console.log(response.data.list);
      //   })
      // },
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
  .slider {
    max-width: 1110px;
    margin: 20px auto 10px;
  }
  .banner {
    cursor: pointer;
  }
  .banner img {
    width: 100%;
    object-fit: cover;
  }
</style>
