<template>
  <div class="follow-box">
    <div>
      <ul>
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
    created() {
      this.getFollows()
    },
    methods: {
      getFollows() {
        let data = {
          userId: this.userId
        }
        getFollows(data).then(resp => {
          console.log(resp.data)
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
