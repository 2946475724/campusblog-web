<template>
  <div>
    <div class="sidebar">
      <div class="aside-article">
        <div class="title">
          <svg-icon icon-class="hot" class="color-main"></svg-icon>热门文章
        </div>
        <ul class="aside-article-list">
          <li class="item">
            <a><span>简单快速垃圾的地方</span></a>
          </li>
          <li class="item">
            <a><span>简单快速垃圾的地方</span></a>
          </li>
          <li class="item">
            <a><span>简单快速垃圾的地方</span></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SideBar",
    data() {
      return {

      }
    },
    methods: {
      
    },
  }

</script>

<style>
  .sidebar {
    width: 300px;
    margin-left: 10px;
    background-color: #fff;
  }
  .sidebar .aside-article {
    overflow: hidden;
  }
  .aside-article .title {
    height: 30px;
    line-height: 30px;
    padding: 0 16px;
    border-bottom: 1px solid #eee;
    text-transform: uppercase;
  }
  .aside-article .aside-article-list {
    padding: 5px 0;
  }
  .aside-article-list .item {
    display: block;
    height: 30px;
    line-height: 30px;
    padding: 0 16px;
  }
</style>
