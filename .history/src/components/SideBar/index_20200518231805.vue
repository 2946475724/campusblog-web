<template>
  <div>
    <div class="sidebar">
      <div class="aside-clock"> 
        20:20:20
      </div>
      <div class="aside-article">
        <div class="title">
          <span class="hot">热门文章</span>
        </div>
        <div class="list">
          <ul class="aside-article-list" v-for="(item, index) in hotArticles" :key="index">
            <li class="item">
              <span class="rank-num" v-if="index === 0" style="background-color: red;">{{index + 1}}</span>
              <span class="rank-num" v-else-if="index === 1" style="background-color: goldenrod;">{{index + 1}}</span>
              <span class="rank-num" v-else-if="index === 2"
                style="background-color: rgb(162, 233, 19);">{{index + 1}}</span>
              <span class="rank-num" v-else>{{index + 1}}</span>
              <a :title="item.title"><span @click="gotoInfo(item.id)">{{item.title | formatStr}}</span></a>
            </li>
          </ul>
        </div>
      </div>
      <div class="aside-tag">
        <div class="title">
          <span class="hot">标签云</span>
        </div>
        <div class="tag-content">
          <div class="tag-list">
            <ul>
              <li v-for="item in tags" :key="item.id">
                <a href="javascript:void(0);" @click="gotoInfo(item.id)">{{item.name}}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getHotArticle,
    addArticleViewCount
  } from '@/api/article'
  import {
    getTagListByClickCount,
    increaseClickCount
  } from '@/api/tag'
  const defaultQuery = {
    keyword: "",
    pageNum: "",
    pageSize: "",
  };
  export default {
    name: "SideBar",
    data() {
      return {
        listQuery: Object.assign({}, defaultQuery),
        hotArticles: [],
        tags: [],
      }
    },
    created() {
      this.getHotArticle();
      this.getTagListByClickCount();
      this.getTime()
    },
    filters: {
      formatStr(value) {
        if (value.length > 13) {
          value = value.substring(0, 14) + "..."
        }
        return value
      }
    },
    methods: {
      // 获取当前时间
      getTime() {
        let date = new Date()
        console.log(date.toLocaleString())
      },
      // 获取热门文章
      getHotArticle() {
        getHotArticle().then(resp => {
          console.log(resp.data)
          this.hotArticles = resp.data
        })
      },
      // 跳转文章详情页
      gotoInfo(id) {
        console.log(id);
        let routeData = this.$router.push({
          path: `/article/${id}`,
        })
        addArticleViewCount(id).then(resp => {
          console.log(resp)
        })
        location.reload()
      },
      // 通过点击量获取标签列表
      getTagListByClickCount() {
        getTagListByClickCount().then(resp => {
          this.tags = resp.data
        })
      },
      // 跳转标签详情页
      gotoInfo(id) {
        console.log(id);
        let routeData = this.$router.push({
          path: `/tag/${id}`,
        })
        increaseClickCount(id).then(resp => {
          console.log(resp.data)
        })
      },

    },
  }

</script>

<style>
  .sidebar {
    width: 300px;
    margin-left: 10px;
  }
  .aside-clock {
    background-color: #fff;
    margin-bottom: 10px;
  }

  .sidebar .aside-article {
    background-color: #ffffff;
    overflow: hidden;
  }

  .aside-article .title {
    height: 30px;
    line-height: 30px;
    margin: 10px 16px;
    text-transform: uppercase;
    position: relative;
    padding-bottom: 3px;
  }

  .aside-article .title::after {
    content: "";
    background-color: #333;
    left: 0;
    bottom: 0;
    width: 50px;
    height: 2px;
    position: absolute;
    transition: 0.5s;
  }

  .aside-article:hover .title::after {
    width: 70px;
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
    color: #333;
    font-weight: 700;
    padding-bottom: 5px;
  }

  .rank-num {
    min-width: 15px;
    width: auto;
    line-height: 100%;
    padding: 2px 0;
    display: inline-block;
    text-align: center;
    margin-right: 5px;
    font-size: 12px;
    background: #8eb9f5;
    color: #fff;
  }

  .aside-tag {
    overflow: hidden;
    margin-top: 20px;
    background-color: #fff;
  }

  .aside-tag .title {
    height: 30px;
    line-height: 30px;
    margin: 10px 16px;
    text-transform: uppercase;
    position: relative;
    padding-bottom: 3px;
  }

  .aside-tag .title::after {
    content: "";
    background-color: #333;
    left: 0;
    bottom: 0;
    width: 40px;
    height: 2px;
    position: absolute;
    transition: 0.5s;
  }

  .aside-tag:hover .title::after {
    width: 50px;
  }

  .tag-content {
    padding: 10px 20px;
    overflow: hidden;
  }

  .tag-list {
    text-align: left;
  }

  .tag-list ul li {
    display: inline-block;
    background: #fefefe none repeat scroll 0 0;
    border: 1px solid #f0f0f0;
    height: 30px;
    line-height: 26px;
    margin: 0 5px 9px 0;
    padding: 0 10px;
    text-transform: uppercase;
    transition: all 0.4s ease 0s;
    font-size: 14px;
  }

  .tag-list ul li:hover {
    background: #66cc99 none repeat scroll 0 0;
  }

  .tag-list ul li:hover a {
    color: #fff;
  }

  .tag-list ul li a {
    position: relative;
  }

</style>
