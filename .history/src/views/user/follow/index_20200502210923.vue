<template>
  <div class="follow-box">
    <div>
      <ul v-if="follows.length === 0" style="text-align: center; font-size: 14px;">
        你还未关注用户~
      </ul>
      <ul v-else>
        <li class="follow-list" v-for="(item, index) in follows" :key="index">
          <div class="follow-info">
            <el-avatar :src="item.icon"></el-avatar>
            <span style="margin-left: 10px;">{{item.nickName}}</span>
          </div>
          <div>
            <el-button v-if="isFollow" size="small" @click="unFollow(item.id)">取消关注</el-button>
            <el-button v-if="followId === item.id" type="primary" size="small" @click="follow(item.id)">关注</el-button>
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
        isFollow: true,
        followId: 0,
      }
    },
    watch: {
      userId(curInfo) {
        this.userId = curInfo
        this.getFollows()
      }
    },
    created() {
      this.getFollows()
    },
    methods: {
      getFollows() {
        let data = {
          userId: this.userId
        }
        getFollows(data).then(resp => {
          this.follows = resp.data.follows
        })
      },
      // 关注
      follow(id) {
        let data = {
          userId: this.userId,
          followingId: id
        }
        follow(data).then(resp => {
          if (resp.code === 200) {
            this.$message("关注成功")
            this.isFollow = true
          }
        })
      },
      // 取消关注
      unFollow(id) {
        console.log(id)
        let data = {
          userId: this.userId,
          followingId: id
        }
        unFollow(data).then(resp => {
          if (resp.code === 200) {
            this.$message("取消关注")
            this.isFollow = false
            this.followId = id
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
    border-bottom: 1px solid #eaeaea;
    padding: 10px 5px;
    margin-top: 10px;
  }
  .follow-info {
    font-size: 14px;
    color: #333;
    display: flex;
    align-items: center;
    font-weight: 700;
  }
</style>
