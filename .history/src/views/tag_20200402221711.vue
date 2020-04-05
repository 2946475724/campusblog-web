<template>
  <div>
    标签页
  </div>
</template>

<script>
  export default {
    name: 'Tag',
    data() {
      return {
        tagId: "",
      }
    },
    created() {
      this.tagId = this.$route.query.tagId
      console.log(this.tagId)
    },
  }
</script>

<style>

</style>