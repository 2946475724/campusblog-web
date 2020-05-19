<template>
  <div>
    <NavBar></NavBar>
    <div class="tag-banner">
      <div class="tag-title"><img src="static/images/tag.jpg" /></div>
    </div>
    <div class="tag-container">
      <div class="tag-header">
        <span style="margin-right: 20px;" v-for="(navItem, index) in nav" ref="navItem" @click="selectNav(navItem)">
          <a href="javascript:void(0);" :class="{active:activeName === navItem}">{{navItem}}</a>
        </span>
        <span><input class="tag-search" placeholder="搜索标签" v-model="keyword" @keyup.enter="search()" /></span>
      </div>
      <div class="tag-content-list">
        <ul>
          <li class="item" v-for="(item, index) in tags" :key="index">
            <div class="tag-info">
              <span class="tag-name" @click="gotoInfo(item.id)">{{item.name}}</span>
              <span class="tag-meta">{{item.clickCount}}篇文章</span></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    addArticleViewCount
  } from '@/api/article'
  import {
    getTagList,
    getTagListWithHot,
    getTagListWithLatest
  } from '@/api/tag'
  import NavBar from '@/components/NavBar'
  export default {
    name: 'Tag',
    components: {
      NavBar
    },
    data() {
      return {
        nav: ['最热', '最新'],
        activeName: '最热',
        tagId: "",
        articles: [],
        tags: [],
        tagName: "",
        keyword: ""
      }
    },
    created() {
      this.getTagListWithHot()
    },
    filters: {
      strFilter(value) {
        if (value && value.length > 50) {
          value = value.substring(0, 50) + '...';
        }
        return value;
      }
    },
    methods: {
      getArticlesByTagId() {
        let params = {
          tagId: this.tagId
        }
        getArticlesByTagId(params).then(resp => {
          this.articles = resp.data.articles
          this.tagName = resp.data.name
        })
      },
      getTagListWithHot() {
        getTagListWithHot().then(resp => {
          this.tags = resp.data
          console.log(resp)
        })
      },
      getTagListWithLatest() {
        getTagListWithLatest().then(resp => {
          this.tags = resp.data
        })
      },
      //跳转文章详情页
      gotoInfo(id) {
        console.log(id);
        let routeData = this.$router.push({
          path: `/tag/${id}`,
        })
        // addArticleViewCount(id).then(resp => {
        //   console.log(resp)
        // })
      },
      selectNav(navItem) {
        this.activeName = navItem
        switch (navItem) {
          case '最热':
            this.getTagListWithHot()
            break;
          case '最新':
            this.getTagListWithLatest()
            break;
          default:
            this.getTagListWithHot()
            break;
        }
      },
      search() {
        let data = {
          "keyword": this.keyword,
          "pageNum": "",
          "pageSize": "10"
        }
        getTagList(data).then(resp => {
          console.log(resp.data.list)
          this.tags = resp.data.list
        })
      },
    },
  }

</script>

<style>
  .tag-banner img {
    width: 100%;
    height: 200px;
  }

  .tag-container {
    width: 960px;
    margin: 0 auto;
  }

  .tag-container .tag-header {
    display: flex;
    align-items: center;
    margin: 10px 0;
    font-size: 14px;
  }

  .tag-search {
    padding: 5px;
    border: 1px solid #333;
    outline: none;
    font-size: 12px;
  }

  .tag-content-list ul {
    width: 100%;
  }

  .item {
    width: 20%;
    display: inline-block;
    margin-bottom: 10px;
    padding: 5px;
    box-sizing: border-box;
    text-align: center;
  }

  .tag-info {
    border: 1px solid #fff;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    padding: 10px 0;
  }

  .tag-name {
    cursor: pointer;
  }

  .tag-meta {
    font-size: 12px;
    color: #909090;
  }

  .active {
    color: #eeaaee;
  }

</style>
