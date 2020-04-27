<template>
  <div>
    <!-- 顶部导航栏 -->
    <NavBar></NavBar>
    <!-- banner轮播图 -->
    <div class="slider">
      <el-carousel height="230px">
        <el-carousel-item v-for="(item, index) in bannerList" :key="index">
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
        bannerList: [
          {
            pic: "/static/images/banner1.jpg"
          },
          {
            pic: "/static/images/banner2.jpg"
          }
        ],
      };
    },
    mounted() {
    },
    created() {
    },
    methods: {

    },
  };
</script>

<style scoped>
  .slider {
    /* max-width: 100%; */
    margin: 10px auto 10px;
  }
  .banner {
    cursor: pointer;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .banner img {
    object-fit: cover;
    max-width: 100%;
    /* max-height: 230px */
    height: 100%;
  }
</style>
