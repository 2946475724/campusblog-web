<template>
  <div>
    <NavBar></NavBar>
    <div class="bg-banner">
      <img src="/static/images/banner3.png"/>
    </div>
    <div class="wrapper">
      <div class="left-side">
        <ul class="nav-list">
          <li>学习</li>
          <li>学习</li>
          <li>学习</li>
          <li>学习</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/NavBar'
  export default {
    name: "Article",
    components: {
      NavBar
    },
    data() {
      return {
        
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
    margin: 0 auto;
    margin-top: 10px;
  }
  .left-side {
    width: 160px;
    background-color: #fff;
  }
  .nav-list {

  }
</style>