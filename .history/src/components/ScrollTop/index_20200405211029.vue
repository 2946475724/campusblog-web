<template>
  <div id="goTop">
    <div class="icons" v-show="visiable" @click="handleScrollTop">
      <svg-icon icon-class="scroll-top" class="color-main"></svg-icon>
    </div>
  </div>
</template>



<script>
  export default {
    name: "ScrollTop",
    data() {
      return {
        scrollTop: null, //初始化scrollTop
        visiable: false, //默认不显示
      }
    },
    methods: {
      handleScroll() {
        this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (this.scrollTop > 100) {
          this.visiable = true
        } else {
          this.visiable = false
        }
      },

      handleScrollTop() {
        let timer = null,
          that = this
        cancelAnimationFrame(timer)
        timer = requestAnimationFrame(function fn() {
          if (that.scrollTop > 0) {
            that.scrollTop -= 50
            document.body.scrollTop = document.documentElement.scrollTop = that.scrollTop;
            timer = requestAnimationFrame(fn)
          } else {
            cancelAnimationFrame(timer);
            that.visiable = false;
          }
        })
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }
</script>

<style scoped>
  .icons {
    position: fixed;
    right: 30px;
    bottom: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background:#fff;
    box-shadow: 0 0 6px rgba(0,0,0,.12);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.1s linear;
    cursor: pointer;
  }

  .icons:hover {
    background:#eee;
  }

  .icons-top {
    display: block;
    width: .80rem;
    height: .80rem;
    background-size: .40rem;
    background-repeat: no-repeat;
    background-position: center center;
  }
</style>