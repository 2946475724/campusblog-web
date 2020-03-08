<template>
  <div>
    <div v-for="item in comments" :key="item.id">
      <div class="commentList">
        <span class="left p1">
          <img v-if="item.user"
            :src="item.user.icon ? item.user.icon:'/static/images/default.jpg'" />
          <img v-else src="/static/images/default.jpg" />
        </span>

        <span class="right p1">
          <div class="rightTop" v-if="item.user">
            <el-link class="userName" :underline="false">{{item.user.username}}</el-link>
            <span class="timeAgo">{{item.createTime | dateFormat}}</span>
          </div>

          <div class="rightCenter">
            {{item.content}}
          </div>

          <div class="rightBottom">
            <el-link class="b1" :underline="false" @click="replyTo(item)">回复</el-link>
            <el-link class="b1" :underline="false" @click="delComment(item)">删除</el-link>
          </div>

          <div class="rightCommentList">
            <CommentBox class="comment" :userInfo="userInfo" :toInfo="toInfo" :id="item.id" :commentInfo="commentInfo"
              @submit-box="submitBox" @cancel-box="cancelBox"></CommentBox>

            <CommentList class="commentStyle" :id="'commentStyle:' + item.id" :comments="item.replyList"
              :commentInfo="commentInfo"></CommentList>
          </div>
        </span>
      </div>
    </div>
  </div>

</template>

<script>
  import { mapMutations } from 'vuex';
  import CommentBox from "../CommentBox";
  import {
    addComment,
    deleteComment,
    getCommentList,
  } from "@/api/comment";

  export default {
    name: "CommentList",
    components: {
      CommentBox
    },
    props: ['comments', 'userInfos', 'commentInfo'],
    data() {
      return {
        taggleStatue: true,
        value: '',
        toInfo: {
          id: "",
          commentId: ""
        },
        userInfo: {}
      };
    },
    created() {

    },
    mounted() {

    },
    compute: {},
    methods: {
      ...mapMutations(['SET_COMMENT_LIST']),
      //回复按钮
      replyTo(item) {
        if (!this.validLogin()) {
          this.$notify.error({
            title: '错误',
            message: "登录后才能回复评论哦~",
            offset: 100
          });
          return
        }
        let userId = item.userId;
        let commentId = item.Id;
        var lists = document.getElementsByClassName("comment");
        for (var i = 0; i < lists.length; i++) {
          lists[i].style.display = 'none';
        }
        document.getElementById(commentId).style.display = 'block';
        this.toInfo.commentId = commentId
        this.toInfo.Id = userId
      },
      submitBox(e) {
        console.log("添加内容", e)
        let params = {};
        params.userId = e.userId;
        params.content = e.content;
        params.blogId = e.blogId;
        params.toId = e.toCommentId;
        params.toUserId = e.toUserId;
        params.source = e.source
        addComment(params).then(response => {
          if (response.code == "success") {
            let commentData = response.data
            document.getElementById(commentData.toId).style.display = 'none'
            let comments = this.$store.state.app.commentList;
            commentData.user = this.userInfo;
            // 设置回复为空
            commentData.replyList = [];

            commentData.user = this.$store.state.user.userInfo
            this.updateCommentList(comments, commentData.toId, commentData)

            this.$store.commit("setCommentList", comments);

            this.$notify({
              title: '成功',
              message: "评论成功",
              type: 'success',
              offset: 100
            });
          } else {
            this.$notify.error({
              title: '错误',
              message: "评论失败",
              type: 'success',
              offset: 100
            });
          }
        });
      },
      getCommentList: function () {
        let params = {};
        getCommentList(params).then(response => {
          if (response.code == 200) {
            console.log("打印获取的数据"+response.data);
            this.comments = response.data;
          }
        });
      },
      cancelBox(toCommentId) {
        document.getElementById(toCommentId).style.display = 'none'
      },
      taggleAll: function (item) {

        this.taggleStatue = !this.taggleStatue;
        var lists = document.getElementsByClassName("commentStyle");
        for (var i = 0; i < lists.length; i++) {
          lists[i].style.display = 'block';
        }
        if (this.taggleStatue) {
          document.getElementById('commentStyle:' + item.id).style.display = 'block';
        } else {
          document.getElementById(item.id).style.display = 'none';
        }
      },
      delComment: function (item) {
        if (!this.validLogin()) {
          this.$notify.error({
            title: '错误',
            message: "登录后才能删除评论哦~",
            offset: 100
          });
          return
        }
        var that = this;
        let params = {};
        params.id = item.id;
        params.userId = this.$store.state.user.userInfo.id

        deleteComment(params).then(response => {
          if (response.code == "success") {
            this.$notify({
              title: '成功',
              message: "删除成功",
              type: 'success',
              offset: 100
            });

          } else {
            this.$notify.error({
              title: '错误',
              message: "删除失败",
              type: 'success',
              offset: 100
            });
          }
          let comments = this.$store.state.app.commentList;
          this.deleteCommentList(comments, params.id, null)
          this.$store.commit("setCommentList", comments);
          this.$emit("deleteComment", "")
        });
      },
      // 校验是否登录
      validLogin() {
        let userInfo = this.$store.state.user.userInfo
        if (userInfo.username == undefined) {
          return false;
        } else {
          return true;
        }
      },
      /**
       * dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
       * @param dateTimeStamp
       * @returns {string}
       */
      timeAgo(dateTimeStamp) {
        let result = "";
        let minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示
        let hour = minute * 60;
        let day = hour * 24;
        let week = day * 7;
        let halfamonth = day * 15;
        let month = day * 30;
        let now = new Date().getTime(); //获取当前时间毫秒
        dateTimeStamp = dateTimeStamp.substring(0, 18);
        //必须把日期'-'转为'/'
        dateTimeStamp = dateTimeStamp.replace(/-/g, '/');

        let timestamp = new Date(dateTimeStamp).getTime();

        let diffValue = now - timestamp; //时间差

        if (diffValue < 0) {
          return result;
        }
        let minC = diffValue / minute; //计算时间差的分，时，天，周，月
        let hourC = diffValue / hour;
        let dayC = diffValue / day;
        let weekC = diffValue / week;
        let monthC = diffValue / month;

        minC = parseInt(minC)
        hourC = parseInt(hourC)
        dayC = parseInt(dayC)
        weekC = parseInt(weekC)
        monthC = parseInt(monthC)


        if (monthC >= 1 && monthC <= 3) {
          result = " " + parseInt(monthC) + "月前"
        } else if (weekC >= 1 && weekC <= 3) {
          result = " " + parseInt(weekC) + "周前"
        } else if (dayC >= 1 && dayC <= 6) {
          result = " " + parseInt(dayC) + "天前"
        } else if (hourC >= 1 && hourC <= 23) {
          result = " " + parseInt(hourC) + "小时前"
        } else if (minC >= 1 && minC <= 59) {
          result = " " + parseInt(minC) + "分钟前"
        } else if (diffValue >= 0 && diffValue <= minute) {
          result = "刚刚"
        } else {
          let datetime = new Date();
          datetime.setTime(dateTimeStamp);
          let Nyear = datetime.getFullYear();
          let Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
          let Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
          let Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
          let Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
          let Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
          result = Nyear + "-" + Nmonth + "-" + Ndate
        }
        return result;
      },
      updateCommentList(commentList, id, targetComment) {
        if (commentList == undefined || commentList.length <= 0) {
          return;
        }
        for (let item of commentList) {
          if (item.id === id) {
            var menu = item.replyList;
            menu.push(targetComment);
          } else {
            this.updateCommentList(item.replyList, id, targetComment);
          }
        }
      },
      deleteCommentList(commentList, id, parentList) {
        if (commentList == undefined || commentList.length <= 0) {
          return;
        }
        for (let item of commentList) {
          if (item.id === id) {
            commentList.splice(commentList.indexOf(item), 1);
          } else {
            this.deleteCommentList(item.replyList, id, item);
          }
        }
      },
    },
  };
</script>


<style scoped>
  .commentStyle {
    display: block;
    margin-top: 10px;
    margin-left: 10px;
    border-left: 1px dashed SlateGray;
  }

  .comment {
    display: none;
  }

  .commentList {
    width: 100%;
    margin: 0 auto;
  }

  .commentList .p1 {
    float: left;
  }

  .commentList .left {
    display: inline-block;
    width: 4%;
    height: 100%;
  }

  .commentList .left img {
    margin: 0 auto;
    width: 100%;
    border-radius: 50%;
  }

  .commentList .right {
    display: inline-block;
    width: 95%;
    margin-left: 5px;
  }

  .commentList .rightTop {
    height: 30px;
  }

  .commentList .rightTop .userName {
    color: #303133;
    margin-left: 10px;
    font-size: 16px;
    font-weight: bold;
  }

  .commentList .rightTop .timeAgo {
    color: #909399;
    margin-left: 10px;
    font-size: 13px;
  }

  .commentList .rightCenter {
    margin-left: 20px;
    height: 50px;
  }

  .commentList .rightBottom {
    margin-left: 10px;
    height: 30px;
  }

  .commentList .rightBottom el-link {}

  .commentList .rightBottom .b1 {
    margin-left: 10px;
  }
</style>
