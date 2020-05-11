<template>
  <div class="follow-box">
    <div>
      <ul v-if="follows.length === 0" style="text-align: center; font-size: 14px;">
        你还未关注用户~
      </ul>
      <ul v-else>
        <li class="follow-list" v-for="(item, index) in follows" :key="index">
          <el-avatar :src="item.icon"></el-avatar>
          <div>
            <el-button v-if="isFollow" size="small" @click="unFollow()">取消关注</el-button>
            <el-button v-else type="primary" size="small" @click="follow()">关注</el-button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {
    getFollows,
    follow,
    unFollow
  } from '@/api/user'
  export default {
    name: 'follow',
    props: ["userId"],
    data() {
      return {
        follows: [],
        userId: this.userId,
        isFollow: true
      }
    },
    watch: {
      userId(curInfo) {
        this.userId = curInfo
        this.getFollows()
      }
    },
    created() {

    },
    methods: {
      getFollows() {
        let data = {
          userId: this.userId
        }
        getFollows(data).then(resp => {
          console.log(resp.data.follows.length)
          this.follows = resp.data.follows
        })
      },
      // 关注
      follow() {
        let data = {
          userId: this.userId,
          followingId: this.follows.id
        }
        follow(data).then(resp => {
          if (resp.code === 200) {
            this.$message("关注成功")
            this.isFollow = true
          }
        })
      },
      // 取消关注
      unFollow() {
        let data = {
          userId: this.userId,
          followingId: this.follows.id
        }
        unFollow(data).then(resp => {
          if (resp.code === 200) {
            this.$message("取消关注")
            this.isFollow = false
          }
        })
      }
    },

  }

</script>

<style>
  .follow-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

</style>
