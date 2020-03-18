<template>
  <div>
    <div class="sidebar">
      <div class="aside-article">
        <div class="title">
          <svg-icon icon-class="hot" class="color-main"></svg-icon>
          <span class="hot">热门文章</span>
        </div>
        <div class="list">
          <ul class="aside-article-list" v-for="item in hotArticles">
            <li class="item">
              <a><span @click="gotoInfo(item.id)">{{item.title | formatStr}}</span></a>
            </li>
          </ul>
        </div>   
      </div>
    </div>
  </div>
</template>

<script>
  import {getHotArticle} from '@/api/article'
  export default {
    name: "SideBar",
    data() {
      return {
        hotArticles: [],
      }
    },
    created() {
      this.getHotArticle();
    },
    filters: {
      formatStr(value) {
        if (value.length > 15) {
          value = value.substring(0, 16) + "..."
        }
        return value
      }
    },
    methods: {
      getHotArticle() {
        getHotArticle().then(resp => {
          console.log(resp.data)
          this.hotArticles = resp.data
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
    padding: 10px 16px;
    border-bottom: 1px solid #eee;
    text-transform: uppercase;
  }
  .aside-article .list {
    margin: 10px 0;
  }
  .aside-article-list .item {
    display: block;
    height: 30px;
    line-height: 30px;
    padding: 0 16px;
    cursor: pointer;
    font-size: 14px;
  }
  .hot {
    font-size: 16px;
    font-weight: 600;
  }
</style>
