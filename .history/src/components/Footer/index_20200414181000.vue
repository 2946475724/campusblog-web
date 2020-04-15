<template>
  <div class="footer">
    <div class="about">关于我们|演戏我们</div>
    <div class=" copyright">
      <a href="javascript:void(0);">Copyright &copy; CampusBlog</a>
    </div>
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
    margin-top: 100px;
    padding-top: 100px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .about {
    font-size: 14px;
    margin-bottom: 10px;
  }
  .copyright {
    font-size: 12px;
    margin-bottom: 20px;
  }

</style>