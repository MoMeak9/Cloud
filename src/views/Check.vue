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

    <el-container class="file-container"
                  :style="flag?'width: 90%;padding: 35px 35px 15px 35px;':'width:350px;padding: 20px 14px 20px 14px;'">
      <el-header class="file-title">
        文件审核
      </el-header>
      <el-main style="padding-left: 0;padding-right: 0;">

        <el-table
            class="file-table"
            :header-cell-style="{color: '#000000'}"
            :default-sort="{prop: 'userName', order: 'ascending'}"
            :data="files">


          <el-table-column
              sortable
              show-overflow-tooltip
              header-align="center"
              align="center"
              prop="userName"
              label="用户">
          </el-table-column>

          <el-table-column
              sortable
              show-overflow-tooltip
              header-align="center"
              align="center"
              prop="fileTime"
              label="上传时间">
          </el-table-column>

          <el-table-column
              sortable
              show-overflow-tooltip
              header-align="center"
              align="center"
              prop="filename"
              label="文件">
          </el-table-column>

          <el-table-column
              header-align="center"
              align="center"
              label="操作"
              :width="flag ? '200' : '90'">


            <template slot-scope="scope">
              <span v-if="scope.row.userName === 'admin'">--</span>

              <el-container v-if="judgeFileType(scope.row.filename) === 1">
                <el-main :style="flag ? 'text-align:center;' : 'text-align:center;padding:0px;'">
                  <el-link type="primary" :style="flag ? 'margin-right:10px;' : ''"
                           @click="showImages(scope.row.pathsUUID)"><i class="el-icon-picture"></i> 查看
                  </el-link>
                  <el-link type="primary" :style="flag ? 'margin-right:10px;' : ''"
                           @click="allowFile(scope.row.filename, scope.row.pathsUUID)"><i
                      class="el-icon-edit-outline"></i>
                    通过
                  </el-link>
                  <el-link type="primary" @click="deleteFile(scope.row.pathsUUID,scope.row.filename)"><i
                      class="el-icon-document-delete"></i>
                    删除
                  </el-link>
                </el-main>
              </el-container>

<!--              <el-container v-else-if="judgeFileType(scope.row.filename) === 2">-->
<!--                <el-main :style="flag ? 'text-align:center;' : 'text-align:center;padding:0px;'">-->
<!--                  <el-link type="primary" :style="flag ? 'margin-right:10px;' : ''"-->
<!--                           @click="playVideo(scope.row.pathsUUID)"><i class="el-icon-video-play"></i> 播放-->
<!--                  </el-link>-->
<!--                  <el-link type="primary" :style="flag ? 'margin-right:10px;' : ''"-->
<!--                           @click="allowFile(scope.row.filename, scope.row.pathsUUID)"><i-->
<!--                      class="el-icon-check"></i>-->
<!--                    通过-->
<!--                  </el-link>-->
<!--                  <el-link type="primary" @click="deleteFile(scope.row.pathsUUID,scope.row.filename)"><i-->
<!--                      class="el-icon-document-delete"></i>-->
<!--                    删除-->
<!--                  </el-link>-->
<!--                </el-main>-->
<!--              </el-container>-->

              <el-container v-else>
                <el-main :style="flag ? 'text-align:center;' : 'text-align:center;padding:0px;'">
                  <el-link type="primary" :style="flag ? 'margin-right:10px;' : ''"
                           @click="allowFile(scope.row.filename, scope.row.pathsUUID)"><i
                      class="el-icon-check"></i>
                    通过
                  </el-link>
                  <el-link type="primary" @click="deleteFile(scope.row.filename, scope.row.pathsUUID)"><i
                      class="el-icon-document-delete"></i> 删除
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
      this.$axios.post('http://' + this.baseHost + '/mycloud/checkController/getFiles', this.$qs.stringify({})).then((response) => {
        this.files = response.data.filesList;
      }).catch(function (error) {
        console.log(error);
      });
    },

    allowFile: function (pathsUUID, filename) {
      this.$confirm('提示： 通过[' + filename + ']的审核？', '审核', {
        confirmButtonText: '通过',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('http://' + this.baseHost + '/mycloud/checkController/allowFile', this.$qs.stringify({
          pathsUUID: this.pathsUUID,
        })).then((response) => {
          this.files = response.data.filesList;
        })
      }).catch(function (error) {
        console.log(error);
      });
    },

    deleteFile: function (pathsUUID, filename) {
      this.$confirm('此操作将永久删除' + ' [' + filename.replace('/', '') + '], 是否继续?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('http://' + this.baseHost + '/mycloud/fileSystem/delFile', this.$qs.stringify({
          PathsUUID: this.pathsUUID,
        })).then((response) => {
          if (response.data.message === "") {
            this.$message({
              message: '删除文件成功！',
              type: 'success'
            });
            this.files = response.data.filesList;
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

    goYun: function () {
      this.$router.push({path: '/cloud'});
    },

    judgeFileType: function (filename) {
      //分辨预览图片，其他文件不予预览
      // if (filename.toLowerCase().indexOf('.mp4') !== -1) {
      //   return 2;
      // } else if (filename.toLowerCase().indexOf('.webm') !== -1) {
      //   return 2;
      // } else if (filename.toLowerCase().indexOf('.mkv') !== -1) {
      //   return 2;
      // } else
        if (filename.toLowerCase().indexOf('.jpg') !== -1) {
        return 1;
      } else if (filename.toLowerCase().indexOf('.png') !== -1) {
        return 1;
      } else if (filename.toLowerCase().indexOf('.jpeg') !== -1) {
        return 1;
      } else {
        return 0;
      }
    },

    showImages: function (pathsUUID) {

      var pictures = [];

      for (let i = 0; i < this.files.length; i++) {
        if (this.files[i].pathsUUID == pathsUUID) {
          var imgs = 1;

          var url = encodeURIComponent('http://' + this.baseHost + '/cloud/fileSystem/' + this.userName + this.files[i].path);
          url = url.replace(/%3A/g, ':');
          url = url.replace(/%2F/g, '/');
          pictures.push({src: url, index: i});

          for (let j = i + 1; j < this.files.length; j++) {
            if (this.files[j].filename.toLowerCase().indexOf('.jpg') != -1 || this.files[j].filename.toLowerCase().indexOf('.jpeg') != -1 || this.files[j].filename.toLowerCase().indexOf('.png') != -1) {
              var _url = encodeURIComponent('http://' + this.baseHost + '/cloud/fileSystem/' + this.userName + this.files[j].path);
              _url = _url.replace(/%3A/g, ':');
              _url = _url.replace(/%2F/g, '/');
              pictures.push({src: _url, index: j});

              imgs++;
              if (imgs == 10) {
                break;
              }
            }
          }

          if (imgs < 10) {
            for (let j = 0; j < i; j++) {
              if (this.files[j].filename.toLowerCase().indexOf('.jpg') != -1 || this.files[j].filename.toLowerCase().indexOf('.jpeg') != -1 || this.files[j].filename.toLowerCase().indexOf('.png') != -1) {
                var n_url = encodeURIComponent('http://' + this.baseHost + '/cloud/fileSystem/' + this.userName + this.files[j].path);
                n_url = n_url.replace(/%3A/g, ':');
                n_url = n_url.replace(/%2F/g, '/');
                pictures.push({src: n_url, index: j});

                imgs++;
                if (imgs == 10) {
                  break;
                }
              }
            }
          }
          break;
        }
      }
      this.images = pictures;
      this.$viewer.show();
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

.file-container {
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

.file-title {
  font-size: 1.75rem;
  color: #f3f9f1;
  border-bottom: 1px solid #EBEEF5;
  user-select: none;
}

.file-row {
  border-bottom: 1px solid #EBEEF5;
}

.file-table {
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