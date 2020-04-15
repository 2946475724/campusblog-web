<template>
  <div>
    <div class="sidebar">
      <div class="aside-article">
        <div class="title">
          <!-- <svg-icon icon-class="hot" class="color-main"></svg-icon> -->
          <span class="hot">热门文章</span>
        </div>
        <div class="list">
          <ul class="aside-article-list" v-for="(item, index) in hotArticles" :key="index">
            <li class="item">
              <span class="rank-num" v-if="index === 0" style="background-color: red;">{{index + 1}}</span>
              <span class="rank-num" v-else-if="index === 1" style="background-color: goldenrod;">{{index + 1}}</span>
              <span class="rank-num" v-else-if="index === 2" style="background-color: rgb(162, 233, 19);">{{index + 1}}</span>
              <span class="rank-num" v-else>{{index + 1}}</span>
              <a :title="item.title"><span @click="gotoInfo(item.id)">{{item.title | formatStr}}</span></a>
            </li>
          </ul>
        </div>   
      </div>
      <div class="aside-tag">
        <div class="title">
          <!-- <svg-icon icon-class="tag" class="color-main"></svg-icon> -->
          <span class="hot">标签云</span>
        </div>
        <div class="tag-content">
          <div class="tag-list">
            <ul>
              <li v-for="item in tags" :key="item.id">
                <a href="javascript:void(0);" @click="getArticles(item.id)">{{item.name}}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getHotArticle} from '@/api/article'
  import {getTagList} from '@/api/tag'
  export default {
    name: "SideBar",
    data() {
      return {
        hotArticles: [],
        tags: [],
      }
    },
    created() {
      this.getHotArticle();
      this.getTagList();
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
      //获取热门文章
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
          path: `/detail/${id}`,
        })
        location.reload()
      },
      getTagList() {
        getTagList().then(resp => {
          console.log(resp.data)
          this.tags = resp.data
        })
      },
      // 跳转到根据tagId查询文章页面
      getArticles(tagId) {
        this.$router.push({
          path: '/tag',
          query: {
            tagId: tagId
          }
        })
      }

    },
  }

</script>

<style>
  .sidebar {
    width: 300px;
    margin-left: 10px;
  }
  .sidebar .aside-article {
    background-color: #ffffff;
    overflow: hidden;
  }
  .aside-article .title {
    height: 30px;
    line-height: 30px;
    margin: 10px 16px;
    border-bottom: 1px solid #eee;
    text-transform: uppercase;
    position: relative;
  } 
  .aside-article .title::after {
    content: "";
    background-color: #333;
    left: 0;
    bottom: 0;
    width: 50px;
    height: 2px;
    position: absolute;
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
    padding: 10px 16px;
    border-bottom: 1px solid #eee;
    text-transform: uppercase;
  }
  .tag-content {
    padding: 25px;
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
  .tag-list ul li a{
    /* color: #999; */
    position: relative;
  }
</style>
