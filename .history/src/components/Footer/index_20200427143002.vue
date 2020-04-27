<template>
  <div class="footer">
    <div class="about">关于我们 | 联系我们</div>
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
    background-color: #fff;
    display: flex;
    flex-direction: column;
    text-align: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    padding-top: 100px;
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