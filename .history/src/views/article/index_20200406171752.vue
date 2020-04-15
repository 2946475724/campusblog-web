<template>
  <div>
    <NavBar></NavBar>
    <div class="bg-banner">
      <img src="/static/images/banner3.png"/>
    </div>
    <div class="wrapper">
      <div class="left-side">
        <ul class="nav-list" v-for="(item, index) in categotyList" :key="index">
          <li>{{item.name}}</li>
        </ul>
      </div>
      <div class="">

      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/NavBar'
  import {getCategoryList} from '@/api/category'
  export default {
    name: "Article",
    components: {
      NavBar
    },
    data() {
      return {
        categotyList: [],
      }
    },
    created() {
      this.getCategories()
    },
    methods: {
      getCategories() {
        getCategoryList().then(resp => {
          console.log(resp.data)
        })
      }
    },
  }
</script>

<style>
  .bg-banner {
    width: 100%;
  }
  .bg-banner img {
    width: 100%;
    height: 300px;
  }
  .wrapper {
    width: 1110px;
    margin: 10px auto 0;
  }
  .left-side {
    width: 160px;
    background-color: #fff;
  }
  .nav-list  li{
    height: 48px;
    line-height: 48px;
    padding: 0 20px;
    font-size: 14px;
    color: #333333;
    cursor: pointer;
  }
  .nav-list li:hover {
    background-color: #eaeaea;
  }
</style>