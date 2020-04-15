<template>
  <div>
    <NavBar></NavBar>
    <div class="bg-banner">
      <img src="/static/images/banner3.png"/>
    </div>
    博客页
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
</style>