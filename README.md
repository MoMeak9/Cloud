# Cloud项目介绍（前端）

## 介绍

本云盘项目支持在不同的设备上访问服务器，实现文件的快速上传与共享功能。
同时因为前端功能实现的比较多，并且也是抵达了后端第四轮考核，所以就干脆主编了接口文档。
**主要功能**包括用户登录 / 注册、文件管理(批量上传 / 移动 / 删除、下载、排序、搜索、重命名等)、文件在线预览(图片、音频、视频、文档等)、后台用户管理与文件审核系统。

## 技术栈

### 内容

HTML + CSS + JS + Vue + Element UI + Node.js + Yarn/ Npm +Webpack + 多个开源项目

### Vue

使用Vue全家桶开发

vue-cli + vue2.X + vuex + vue-router + axios + 各种插件

### 技术特点

1. 前后端分离开发，各自独立，之间通过JSON进行交互
2. 使用Elemen-ui组件库完成响应式部署以及部分美化
3. particles.js（轻量级粒子背景库）实现动态背景美化
4. Viewer.js 实现图片预览
5. APlayer实现音乐文件播放
6. DPlayer视频播放器实现视频播放
7. Ace实现浏览器上的代码编辑+brace

## 功能介绍

1. 用户可以注册新的账号，登录账号，登录之后也可以退出账号，修改账号信息，其中admin账号可以删除和修改其他账号，并对普通用户上传的文件进行在线审核。
2. 每个用户的初始空间大小可自定义（系统默认1GB），当执行上传文件、删除文件或编辑文本文件的操作后，用户当前可使用的空间大小就会得到更新
3. 可对文件和文件夹进行基本的一些操作，可以新建文件夹，文件夹重命名，删除文件夹，也可以上传文件，下载文件（点击文件名即可下载文件），文件重命名，删除文件
4. 文件批量管理功能，批量移动文件或文件夹，批量删除文件或文件夹，批量上传文件
5. 文件排序功能，可对当前目录下的文件或文件夹进行排序操作，可以按照文件名、创建日期和文件大小升序或者降序排列
6. 文件搜索功能，可对当前目录下的文件或文件夹进行搜索操作，方便对文件或文件夹执行其他操作
7. 文件预览功能，可以在线预览常见的媒体文件，例如浏览图片文件，播放音频文件，观看视频文件，查看文本文件等等
8. 除了可以查看文本文件以外，还可以编辑文本文件，常见的代码文件，例如可以高亮显示和编辑java文件、html文件、python文件、c++文件等等

### 主要页面

1. 登入
2. 注册
3. 设置
4. 用户管理
5. 文件审核
6. 网盘主页

## 参考项目（Github开源）

1. [**skydrive**](https://github.com/hcLei/skydrive)
2. [**快捷网盘**](https://github.com/Qzhangqi/SHARECLOUD-vue)
3. [**Vue-Net-disk**](https://github.com/xiexiaoyang/Vue-Net-disk)
4. [**DownloadTool**](https://github.com/bladedragon/DownloadTool)
5. [**vue-filestore**](https://github.com/yuhang-dong/vue-filestore)