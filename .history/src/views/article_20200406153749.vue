<template>
  <div>
    <NavBar></NavBar>
    <div>
      <img src="/static/images/banner3.png"/>
    </div>
    博客页
  </div>
</template>

<script>
  import {NavBar} from '@/components/NavBar'
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

</style>