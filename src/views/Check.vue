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

    <el-container class="user-container"
                  :style="flag?'width: 90%;padding: 35px 35px 15px 35px;':'width:350px;padding: 20px 14px 20px 14px;'">
      <el-header class="user-title">
        管理用户
      </el-header>
      <el-main style="padding-left: 0;padding-right: 0;">

        <el-table
            class="user-table"
            :header-cell-style="{color: '#000000'}"
            :default-sort="{prop: 'userName', order: 'ascending'}"
            :data="users">

          <el-table-column
              sortable
              show-overflow-tooltip
              header-align="center"
              align="center"
              prop="userName"
              label="用户"
              :width="flag ? '130' : '75'">
          </el-table-column>

          <el-table-column
              sortable
              header-align="center"
              align="center"
              prop="regSex"
              label="性别"
              :width="flag ? '100' : '75'">
          </el-table-column>

          <el-table-column
              sortable
              show-overflow-tooltip
              header-align="center"
              align="center"
              prop="regEmail"
              label="邮箱"
              v-if="flag">
          </el-table-column>

          <el-table-column
              sortable
              show-overflow-tooltip
              header-align="center"
              align="center"
              prop="regTime"
              v-if="flag"
              label="注册时间">
          </el-table-column>

          <el-table-column
              sortable
              show-overflow-tooltip
              header-align="center"
              align="center"
              prop="progress"
              label="空间">

            <template slot-scope="scope">
              <el-tooltip :content=scope.row.userSpace placement="left" effect="light">
                <el-progress :text-inside="true" :stroke-width="15" :percentage="Math.round(scope.row.progress)"
                             style="line-height: 33px;"></el-progress>
              </el-tooltip>
            </template>

          </el-table-column>

          <el-table-column
              header-align="center"
              align="center"
              label="操作"
              :width="flag ? '200' : '90'">

            <template slot-scope="scope">
              <span v-if="scope.row.userName === 'admin'">--</span>
              <el-container v-else>
                <el-main :style="flag ? 'text-align:center;' : 'text-align:center;padding:0px;'">
                  <el-link type="primary" :style="flag ? 'margin-right:10px;' : ''"
                           @click="modUser(scope.row.userName, scope.row.userUUID)"><i class="el-icon-edit-outline"></i>
                    修改
                  </el-link>
                  <el-link type="primary" @click="deleteUser(scope.row.userName)"><i class="el-icon-circle-close"></i>
                    删除
                  </el-link>
                </el-main>
              </el-container>
            </template>

          </el-table-column>

        </el-table>

      </el-main>
      <el-footer>
        <el-form class="login-container" label-position="left" label-width="0px">
          <el-form-item style="width: 100%">
            <el-button type="primary" class="button-border" @click="goCheck()">文件审核</el-button>
          </el-form-item>
          <el-form-item style="width: 100%">
            <el-button type="primary" class="button-border" @click="goYun()">返回</el-button>
          </el-form-item>
        </el-form>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "check",
  data() {
    return {
      flag: true,
      baseHost: '',
      users: []
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
      this.getUsersFile();
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
  methods: {
    isMobile: function () {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    },
    getUsersFile: function () {
      this.$axios.post('http://' + this.baseHost + '/mycloud/userController/getUsers', this.$qs.stringify({})).then((response) => {
        this.users = response.data.usersList;
        for (let i = 0; i < this.users.length; i++) {
          this.users[i]['userSpace'] = response.data.userSpace[i];
          if (this.users[i].regTime === '') {
            this.users[i].regTime = '--';
          }
          var userTotalSize = this.userSpaceSize = this.users[i].userName === 'admin' ? this.$store.state.adminSpaceSize : this.$store.state.userSpaceSize;
          var space = this.users[i].userSpace;
          var userSpace = '';
          if (space <= 1024) {
            userSpace = '空间大小：' + parseFloat(space).toFixed(2) + 'MB / ' + (userTotalSize / (1024 * 1024 * 1024)) + 'GB';
          } else {
            userSpace = '空间大小：' + parseFloat(space / 1024).toFixed(2) + 'GB / ' + (userTotalSize / (1024 * 1024 * 1024)) + 'GB';
          }
          this.users[i].userSpace = userSpace;
          this.users[i]['progress'] = space / (userTotalSize / (1024 * 1024)) * 100;
        }

      }).catch(function (error) {
        console.log(error);
      });
    },
  }
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