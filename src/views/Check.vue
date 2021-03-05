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
        文件审核
      </el-header>
      <el-main style="padding-left: 0;padding-right: 0;">

        <el-table
            class="user-table"
            :header-cell-style="{color: '#000000'}"
            :default-sort="{prop: 'userName', order: 'ascending'}"
            :data="files">

          <el-table-column
              sortable
              show-overflow-tooltip
              header-align="center"
              align="center"
              prop="userName"
              label="用户"
              :width="flag ? '160' : '75'">
          </el-table-column>

          <el-table-column
              sortable
              show-overflow-tooltip
              header-align="center"
              align="center"
              prop="fileTime"
              label="上传时间"
              :width="flag ? '160' : '75'">
          </el-table-column>

          <el-table-column
              sortable
              show-overflow-tooltip
              header-align="center"
              align="center"
              prop="fileName"
              label="文件"
              :width="flag ? '160' : '75'">
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
                           @click="allowFile(scope.row.fileName, scope.row.pathsUUID)"><i
                      class="el-icon-edit-outline"></i>
                    通过
                  </el-link>
                  <el-link type="primary" @click="deleteFile(scope.row.pathsUUID,scope.row.fileName)"><i
                      class="el-icon-circle-close"></i>
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
      files: [],
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
      }, 150000);
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
      this.$axios.post('http://' + this.baseHost + '/mycloud/userController/getFile', this.$qs.stringify({})).then((response) => {
        this.users = response.data.usersList;
        for (let i = 0; i < this.users.length; i++) {
          this.users[i]['userSpace'] = response.data.userSpace[i];
          if (this.users[i].regTime === '') {
            this.users[i].regTime = '--';
          }
        }

      }).catch(function (error) {
        console.log(error);
      });
    },

    allowFile: function (fileName, pathsUUID) {
      this.$confirm('提示： [' + name + ']？', '修改用户', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('allowFile', pathsUUID);
        this.$router.push({path: '/setting'});
      }).catch(() => {
        this.test = 2;
      });
    },

    deleteFile: function (pathsUUID, filename) {
      this.$confirm('此操作将永久删除' + ' [' + filename.replace('/', '') + '], 是否继续?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('http://' + this.baseHost + '/mycloud/checkController/delFile', this.$qs.stringify({
          PathsUUID: this.pathsUUID,
        })).then((response) => {
          if(response.data.message === ""){
            this.$message({
              message: '删除文件成功！',
              type: 'success'
            });
            this.files = response.data.fileList;
          }
        }).catch((error) => {
          console.log(error);
          this.$message({
            type: 'error',
            message: '删除失败！服务器内部错误！'
          });
        });
      });
    },
    }
}
</script>
<style scoped>
@import '../assets/css/style.css';

#check {
  background: url("../assets/image/71279418.png") fixed no-repeat top;
  background-size: cover;
  height: 100%;
  width: 100%;
  position: fixed;
  overflow: scroll;
  z-index: -1;
}

#particles-js {
  position: fixed;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  z-index: 1;
}

.user-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 5% auto;
  background: rgba(0, 0, 0, 0.4);
  border: 5px solid #eaeaea;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.5);
  color: white;
  text-align: center;
  position: relative;
  z-index: 3;
}

.user-title {
  font-size: 1.75rem;
  color: #f3f9f1;
  border-bottom: 1px solid #EBEEF5;
  user-select: none;
}

.user-row {
  border-bottom: 1px solid #EBEEF5;
}

.user-table {
  color: black;
  width: 100%;
  border-radius: 4px;
}

.button-border {
  width: 100%;
  background: rgb(61, 226, 226);
  border: 2px solid #3db8ab;
}

.button-border:hover {
  width: 100%;
  background: rgb(61, 226, 226);
  border: 2px solid #3db8ab;
  box-shadow: 0 0 25px rgba(64, 224, 208, .5);
}

.login-container {
  margin: 0 auto;
  width: 50%;
  position: relative;
  z-index: 3;
}
</style>