<template>
  <div class="follow-box">
    <div>
      <ul>
        <li class="follow-list">
          <el-avatar></el-avatar>
          <div><el-button type="small">关注</el-button></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'follow',
    data() {
      return {

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
