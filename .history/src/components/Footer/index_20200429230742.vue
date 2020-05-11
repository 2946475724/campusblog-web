<template>
  <div class="footer">
    <div>
      <ul>
        <li v-for="(item, index) in linkList" :key="index"><a href="item.url">{{item.title}}</a></li>
      </ul>
    </div>
    <div class="about">关于我们 | 联系我们</div>
    <div class=" copyright">
      <a href="javascript:void(0);">Copyright &copy; CampusBlog</a>
    </div>
  </div>
</template>

<script>
  import {getLinkListBySort} from '@/api/link'
  export default {
    name: "Footer",
    data() {
      return {
        linkList: [],
      }
    },
    created() {
      getLinkListBySort().then(resp => {
        console.log(resp.data)
        this.linkList = resp.data
      })
    },
  }
</script>

<style>
  .footer {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 100%;
    margin-top: 100px;
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