<template>
  <div>
    <div class="article-box">
      <el-row :gutter="10" type="flex" justify="center">
        <el-col :span="5" v-for="(item, index) in articles" :key="index">
          <el-card shadow="hover" body-style="height:100px">
            <a href="javascript:void(0);" @click="gotoInfo(item.id)">
              <h3>{{item.title}}</h3>
              <!-- <span class="list-title"><i class="el-icon-date"></i>{{item.createTime | dateFormat}}</span> -->
              <span class="list-title">
                <svg-icon icon-class="person" class="color-main"></svg-icon>{{item.username}}
              </span>
            </a>

          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {getUserInfo} from '@/api/user'
  import {getArticlesByUserId} from '@/api/article'
  export default {
    name: 'Article',
    props: ["userId"],
    data() {
      return {
        activeName: 'first',
        user: {
          id: this.userId,
          username: "",
          nickName: "",
          icon: "",
          note: "",
        },
        articles: [],
      }
    },
    watch: {
      userId(curInfo) {
        this.userId = curInfo
        this.getArticlesByUserId()
      }
    },
    created() {
      
    },
    methods: {
      getArticlesByUserId() {
        let params = {
          userId: this.userId
        }
        getArticlesByUserId(params).then(resp => {
          console.log(resp.data)
          this.articles = resp.data
        })
      }
    },
  }
</script>

<style>
  .article-box {
    height: 200px;
  }
</style>
