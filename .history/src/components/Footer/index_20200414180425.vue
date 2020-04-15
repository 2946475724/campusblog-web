<template>
  <div class="footer">
    <p class=" copyright">
      <a href="javascript:void(0);">Copyright &copy; CampusBlog</a>
    </p>
  </div>
</template>

<script>
  export default {
    name: "Footer",
    data() {
      return {
        
      }
    },
  }
</script>

<style>
  .footer {
    height: 150px;
    margin-top: 20px;
    background-color: #fff;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }
  .copyright {
    font-size: 12px;
    margin-bottom: 20px;
  }

</style>