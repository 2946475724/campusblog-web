<template>
  <div class="footer">
    <div>关于我们</div>
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
    height: 150px;
    margin-top: 20px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: end;
  }
  .copyright {
    font-size: 12px;
    margin-bottom: 20px;
  }

</style>