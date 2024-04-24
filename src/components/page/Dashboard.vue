<template>
  <div>
    当前无首页，后面弄成项目信息
    <!--        <el-carousel :interval="5000" arrow="always">-->
    <!--            <el-carousel-item v-for="item in 4" :key="item">-->
    <!--                <h3 style="margin-left: 600px">{{ item }}</h3>-->
    <!--            </el-carousel-item>-->
    <!--        </el-carousel>-->
  </div>
</template>

<script>
export default {
  name: 'tabs',
  data() {
    return {
      drawer: false,
      direction: 'rtl',
      message: 'first',
      showHeader: false,
      unread: [{
        time: '',
        title: '',
        news: '',
        text: ''
      }],
      openNewsData: {
        time: '',
        title: '',
        news: '',
        text: ''
      }
    }
  },
  mounted: function () {
    this.news()
  },

  methods: {

    handleClose(done) {
      done();
    },
    news() {
      let _self = this;
      this.$axios.get(`/news`)
          .then((response) => {
            _self.unread = response.data;
          })
    },
    look() {
    },
    openNews(row) {
      this.drawer = true
      this.openNewsData.title = '标题： ' + row.newstitle;
      this.openNewsData.news = row.news
    }
  },
  computed: {
    unreadNum() {
      return this.unread.length;
    }
  }
}

</script>


<style>
.message-title {
  cursor: pointer;
}

.handle-row {
  margin-top: 30px;
}

.el-carousel__item h3 {
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}


.el-carousel__item:nth-child(2n) {
  background-image: url("./img.png");
  background-size: 1300px 500px;
}


.el-carousel__item:nth-child(2n+1) {
  background-image: url("./img.png");
  background-size: 1300px 500px;

}
</style>
