<template>
  <div class="follow-box">
    <div>
      <ul v-if="follows.length === 0">
        你还未关注用户~
      </ul>
      <ul v-else>
        <li class="follow-list">
          <el-avatar></el-avatar>
          <div>
            <el-button size="small">取消关注</el-button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {
    getFollows
  } from '@/api/user'
  export default {
    name: 'follow',
    props: ["userId"],
    data() {
      return {
        follows: [],
        userId: this.userId
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
          console.log(resp.data)
          this.follows = resp.data.follows
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
