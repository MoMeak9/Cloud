<template>
  <div id='check'>
    <vue-particles
        color="#ffffff"
        :particleOpacity="0.7"
        :particlesNumber="50"
        shapeType="circle"
        :particleSize="3"
        linesColor="#E6E6FA"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.6"
        :linesDistance="150"
        :moveSpeed="6"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
    >
    </vue-particles>

    <el-row class="head" :style="flag?'width:80%;':'width:326px;'">
      <el-col :span="14">
        <el-container>
          <el-main class="head-logo">
            <h2>MyCloud</h2>
          </el-main>
        </el-container>
      </el-col>
      <el-col :span="10">
        <el-container>
          <el-main class="head-col">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                {{ userName }}<i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item style="font-size:12px;height:36px;text-align:center;">
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-warning-outline" @click.native="loginOut()">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-main>
        </el-container>
      </el-col>
    </el-row>


  </div>
</template>

<script>
export default {
  name: "check",
  data() {
    return {
      baseHost: '',
      userName: '',
      search: '',
      flag:'true',
    }
  },
  mounted() {
    this.baseHost = this.$store.state.baseHost;
    if (this.$store.state.userName === '') {
      this.$message({
        message: '用户未登录！即将返回登录页面',
        type: 'error'
      });

      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$router.push({path: '/login'});
      }, 1500);
      //  指定管理员
    } else if (this.$store.state.userName === 'admin') {
      this.getUsersInfo();

      if (this.isMobile()) {
        this.flag = false;
      }
    } else {
      this.$message({
        message: '不是管理员账号，无法审核文件！即将返回主页',
        type: 'error'
      });

      clearTimeout(this.timer);  //清除延迟执行
      this.timer = setTimeout(() => {   //设置延迟执行
        this.$router.push({path: '/cloud'});
      }, 1500);
    }
  },
}
</script>
<style scoped>
#check {
  background: url("../assets/image/71279418.png") fixed no-repeat top;
  background-size: cover;
  height: 100%;
  width: 100%;
  position: fixed;
  overflow: scroll;
  z-index: -1;
}
</style>