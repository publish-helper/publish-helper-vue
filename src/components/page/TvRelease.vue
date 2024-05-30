<template>


  <div v-loading="loading">

    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 电视剧</el-breadcrumb-item>
        <el-breadcrumb-item>填写</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">

      <el-form ref="form" :model="form" label-width="140px" style="margin-top: 20px; margin-right: 20px">
        <el-row>
          <el-col :span="20">
            <el-form-item label="资源路径" prop="detail" style="margin-right: 5px">
              <el-input type="string" v-model="form.filePath" :disabled="true">
                <el-button slot="append" icon="el-icon-search" @click="openFileList()"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="makeTorrent()">制作种子</el-button>
            <el-button type="primary" v-if="this.form.torrentPath" @click="downloadTorrent()">下载种子</el-button>
          </el-col>
        </el-row>


        <el-row v-if="showFileTable">
          <el-col :span="20">
            <el-form-item label="" prop="detail">
              <el-table :data="fileList"
                        max-height="250px"
                        style="background-color: #251f1f;border: 1px solid #a39595; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">

                <el-table-column label="名称">
                  <template slot="header">
                    <!--                    <el-button type="info" icon="el-icon-back" circle></el-button>-->
                    <el-button type="info" size="mini" @click="pathBack()">
                      <i class="el-icon-back"></i>后退
                    </el-button>
                  </template>
                  <template slot-scope="scope">
                    <span v-if="scope.row.type === '文件夹'" @click="pathDir(scope.row.name)"
                          style="cursor: pointer; color: blue;">{{ scope.row.name }}</span>
                    <span v-else>{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="size" label="大小"></el-table-column>
                <el-table-column prop="type" label="类型"></el-table-column>
                <el-table-column label="操作">

                  <template slot-scope="scope">
                    <el-button
                        size="mini"
                        :disabled="scope.row.type !== '文件夹'"
                        @click="selectFileName(scope.$index, scope.row)">选择
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row>
          <el-col :span="18">
            <el-form-item label="请输入豆瓣、IMDB等资源链接" prop="detail" style="margin-right: 5px">
              <el-input type="string" v-model="form.resourceUrl"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="getPtGenInfo()">获取信息</el-button>
            <el-button type="primary" @click="renameEpisode()">重命名剧集</el-button>
          </el-col>
        </el-row>

        <!--        <el-form-item label="文件重命名" prop="detail" style="margin-right: 5px">-->
        <!--          <el-button type="primary" @click="renameFolder()">重命名文件夹</el-button>-->
        <!--        </el-form-item>-->


        <el-row>
          <el-col :span="4">
            <el-form-item label="季" prop="detail" label-width="140px">
              <el-input type="number" v-model="form.season"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="开始于" prop="detail" label-width="50%">
              <el-input type="number" v-model="form.episodeStartNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="总集数" prop="detail" label-width="40%">
              <el-input type="string" v-model="form.totalEpisode">
                <el-button slot="append" type="primary" icon="el-icon-refresh" @click="getTotalEpisode()"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="来源" prop="detail" label-width="50%">
              <el-select v-model="form.source" placeholder="请选择">
                <el-option
                    v-for="item in sourceOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="小组" prop="detail" label-width="50%">
              <el-select v-model="form.team" placeholder="请选择">
                <el-option
                    v-for="item in teamOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>


        <el-form-item label="主标题" prop="detail">
          <el-row>
            <el-col :span="23">
              <el-input type="textarea" :rows="1" v-model="form.main_title_tv">
              </el-input>
            </el-col>
            <el-col :span="1">
              <el-button icon="el-icon-refresh" @click="getNameFromTemplate('main_title_tv')"></el-button>
            </el-col>
          </el-row>
        </el-form-item>


        <el-form-item label="副标题" prop="detail">
          <el-row>
            <el-col :span="23">
              <el-input type="textarea" :rows="1" v-model="form.second_title_tv"></el-input>
            </el-col>
            <el-col :span="1">
              <el-button icon="el-icon-refresh" @click="getNameFromTemplate('second_title_tv')"></el-button>
            </el-col>
          </el-row>
        </el-form-item>


        <el-form-item label="文件名" prop="detail">
          <el-row>
            <el-col :span="23">
              <el-input type="textarea" :rows="1" v-model="form.file_name_tv"></el-input>
            </el-col>
            <el-col :span="1">
              <el-button icon="el-icon-refresh" @click="getNameFromTemplate('file_name_tv')"></el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-row>
          <el-col :span="24">
            <el-form-item label="简介" prop="detail" style="margin-right: 5px">
              <el-input type="textarea" :rows="7" v-model="form.description"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="截图" prop="detail" style="margin-right: 5px">
              <el-button type="primary" @click="getScreenshot()">生成截图</el-button>
              <el-button type="primary" @click="getThumbnail()">生成缩略图</el-button>
              <el-button type="primary" v-if="form.screenshotPath.length > 0 ||  form.thumbnailPath !== ''"
                         @click="uploadPictures()">上传图床
              </el-button>
              <el-button type="primary" v-if="form.screenshotPath.length > 0 ||  form.thumbnailPath !== ''"
                         @click="clearPictures()">清空
              </el-button>


              <div class="block">
                <el-image
                    v-for="screenshot in screenshotPathUrl" :key="screenshot"
                    style="width: 100px; height: 100px"
                    :src="screenshot"
                    :preview-src-list="screenshotPathUrl"
                    fit="fill"></el-image>
              </div>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>
          <el-col :span="22">
            <el-form-item label="Mediainfo" prop="detail" style="margin-right: 5px">
              <el-input type="textarea" :rows="7" v-model="form.mediaInfo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="getMediaInfo()">获取Mediainfo</el-button>
          </el-col>
        </el-row>


        <el-row>
          <el-col :span="24">
            <el-button type="primary" @click="autoFeed()" style="width: 100%" label-width="70%">生成auto
              feed链接（暂无）
            </el-button>
          </el-col>
        </el-row>
      </el-form>

    </div>
  </div>

</template>

<script>
import http from '@/utils/http';
import path from "path";

export default {
  name: "TvRelease",
  data() {
    return {
      loading: false,
      showFileTable: false,
      sourceOptions: [
        {
          label: "WEB-DL",
          value: "WEB-DL",
        }, {
          label: "Remux",
          value: "Remux",
        },
      ],
      teamOptions: [
        {
          label: "AGSVWEB",
          value: "AGSVWEB",
        },
      ],
      form: {
        source: "",
        team: "",
        resourceUrl: "",
        filePath: "",
        description: "",
        englishTitle: "",
        originalTitle: "",
        otherTitles: "",
        year: "",
        actors: "",
        category: "",
        season: 1,
        episodeStartNumber: 1,
        totalEpisode: "",
        main_title_tv: "",
        second_title_tv: "",
        file_name_tv: "",
        currentPathType: "",
        torrentPath: "",
        mediaInfo: "",
        screenshotPath: [],
        thumbnailPath: "",
        audioCodec: "",
        bitDepth: "",
        channels: "",
        frameRate: "",
        hdrFormat: "",
        videoCodec: "",
        videoFormat: "",
        videoPath: ""
      },
      currentDirPath: "",
      fileList: [],
      cacheFileList: {},
      screenshotPathUrl: [],

    }
  },


  mounted: function () {
    this.getTeams()
    this.getSource()
  },


  methods: {
    getNameFromTemplate(template) {
      this.loading = true;
      const params = {
        template: template,
        englishTitle: this.form.englishTitle,
        originalTitle: this.form.originalTitle,
        season: this.form.season,
        year: this.form.year,
        videoFormat: this.form.videoFormat,
        source: this.form.source,
        videoCodec: this.form.videoCodec,
        bitDepth: this.form.bitDepth,
        hdrFormat: this.form.hdrFormat,
        frameRate: this.form.frameRate,
        audioCodec: this.form.audioCodec,
        channels: this.form.channels,
        audioNum: "",
        team: this.form.team,
        otherTitles: this.form.otherTitles,
        seasonNumber: this.form.season,
        totalEpisode: this.form.totalEpisode,
        playletSource: "",
        actors: this.form.actors,
      };

      const url = '/api/getNameFromTemplate?' + new URLSearchParams(params).toString();
      let _self = this;
      http.get(url)
          .then((response) => {
            let data = response.data;
            if (data.statusCode === "OK") {
              console.log(data)
              if (template === "file_name_tv") {
                _self.form.file_name_tv = data.data.name
              } else if (template === "main_title_tv") {
                _self.form.main_title_tv = data.data.name
              } else if (template === "second_title_tv") {
                _self.form.second_title_tv = data.data.name
              }
            } else {
              _self.$message({
                message: data.message,
                type: 'error'
              });
            }
          }).catch((err) => {
        console.log(err)
        _self.$message({
          message: '请求服务器失败',
          type: 'error'
        });
      }).finally(() => {
        // 无论成功还是失败，都会执行的代码
        this.loading = false
      });


    },
    selectFileName(index, row) {
      this.form.filePath = path.join(this.currentDirPath, row.name)
      this.showFileTable = false
      this.form.totalEpisode = ""
      this.getTotalEpisode()
      this.getMediaInfo()
    },

    verifyFolder() {

    },

    getTotalEpisode() {

      if (!this.form.filePath) {
        this.$message({
          message: '请选择一个文件夹',
          type: 'info'
        });
        return
      }

      const path = require('path');
      const params = {
        folderPath: this.form.filePath,
        episodeStartNumber: this.form.episodeStartNumber
      };
      const url = '/api/getTotalEpisode?' + new URLSearchParams(params).toString();
      let _self = this;
      http.get(url)
          .then((response) => {
            let data = response.data;
            console.log(data)
            if (data.statusCode === "OK") {
              this.form.totalEpisode = data.data.totalEpisode
            } else {
              _self.$message({
                message: data.message,
                type: 'error'
              });
            }
          }).catch((err) => {
        console.log(err)
        _self.$message({
          message: '请求服务器失败',
          type: 'error'
        });
      }).finally(() => {
        // 无论成功还是失败，都会执行的代码
        this.loading = false
      });
    },


    openFileList() {
      this.showFileTable = !this.showFileTable
      if (this.showFileTable) {
        this.getFileList()
      }
    },
    pathDir(name) {
      const path = require('path'); // Require the path module at the top of your file
      this.currentDirPath = path.join(this.currentDirPath, name);
      this.getFileList()
    },
    pathBack() {
      // 取this.currentDirPath的上一级目录
      const path = require('path'); // Require the path module at the top of your file
      // Use path.dirname() to get the parent directory of this.currentDirPath
      this.currentDirPath = path.dirname(this.currentDirPath)
      this.getFileList()
    },
    getFileList() {
      // if (this.currentDirPath in this.cacheFileList) {
      //   this.fileList = this.cacheFileList[this.currentDirPath]
      //   this.loading = false;
      //   return
      // }
      const params = {
        path: this.currentDirPath,
      };
      const url = '/api/media/file/list?' + new URLSearchParams(params).toString();
      let _self = this;
      http.get(url)
          .then((response) => {
            let data = response.data;
            console.log(data)
            if (data.statusCode === "OK") {
              this.fileList = data.data.fileList

            } else {
              _self.$message({
                message: data.message,
                type: 'error'
              });
            }
          }).catch((err) => {
        console.log(err)
        _self.$message({
          message: '请求服务器失败',
          type: 'error'
        });
      }).finally(() => {
        // 无论成功还是失败，都会执行的代码
        this.loading = false
      });
    },


    getTeams() {
      const params = {
        configurationName: "team",
      };
      const url = '/api/getComboBoxData?' + new URLSearchParams(params).toString();
      let _self = this;
      http.get(url)
          .then((response) => {
            let data = response.data;
            console.log(data)
            if (data.statusCode === "OK") {
              let teamOptions = []
              let teamArray = data.data.configurationData
              for (const teamKey in teamArray) {
                teamOptions.push(
                    {
                      label: teamArray[teamKey],
                      value: teamArray[teamKey],
                    }
                )
              }
              _self.teamOptions = teamOptions
              if (teamOptions.length > 0) {
                console.log(teamOptions[0])
                _self.form.team = teamOptions[0].value
              }
            } else {
              _self.$message({
                message: data.message,
                type: 'error'
              });
            }
          }).catch((err) => {
        console.log(err)
        _self.$message({
          message: '请求服务器失败',
          type: 'error'
        });
      }).finally(() => {
        // 无论成功还是失败，都会执行的代码
        this.loading = false
      });
    },

    getSource() {
      const params = {
        configurationName: "source",
      };
      const url = '/api/getComboBoxData?' + new URLSearchParams(params).toString();
      let _self = this;
      http.get(url)
          .then((response) => {
            let data = response.data;
            console.log(data)
            if (data.statusCode === "OK") {
              let sourceOptions = []
              let sourceArray = data.data.configurationData
              for (const sourceKey in sourceArray) {
                sourceOptions.push(
                    {
                      label: sourceArray[sourceKey],
                      value: sourceArray[sourceKey],
                    }
                )
              }
              _self.sourceOptions = sourceOptions
              if (sourceOptions.length > 0) {
                console.log(sourceOptions[0])
                _self.form.source = sourceOptions[0].value
              }
            } else {
              _self.$message({
                message: data.message,
                type: 'error'
              });
            }
          }).catch((err) => {
        console.log(err)
        _self.$message({
          message: '请求服务器失败',
          type: 'error'
        });
      }).finally(() => {
        // 无论成功还是失败，都会执行的代码
        this.loading = false
      });
    },

    downloadTorrent() {

      if (!this.form.torrentPath) {
        this.$message({
          message: '请先制作一个种子',
          type: 'info'
        });
        return
      }

      // 触发下载
      window.location.href = '/api/getFile?filePath=' + this.form.torrentPath;
    },
    makeTorrent() {

      if (!this.form.filePath) {
        this.$message({
          message: '请选择一个文件夹',
          type: 'info'
        });
        return
      }

      this.loading = true
      const path = require('path');
      const params = {
        path: this.form.filePath
      };
      const url = '/api/makeTorrent?' + new URLSearchParams(params).toString();
      let _self = this;
      http.post(url)
          .then((response) => {
            let data = response.data;
            if (data.statusCode === "OK") {
              _self.form.torrentPath = data.data.torrentPath
              _self.$message({
                message: data.message,
                type: 'success'
              });
            } else {
              _self.$message({
                message: '提交失败',
                type: 'error'
              });
            }
          }).catch((err) => {
        console.log(err)
        _self.$message({
          message: '提交失败',
          type: 'error'
        });
      }).finally(() => {
        // 无论成功还是失败，都会执行的代码
        this.loading = false
      });
    },
    getPtGenInfo() {
      this.form.actors = "";
      this.form.category = "";
      this.form.description = "";
      this.form.englishTitle = "";
      this.form.originalTitle = "";
      this.form.otherTitles = "";
      this.form.year = "";
      this.form.file_name_tv = "";
      this.form.main_title_tv = "";
      this.form.second_title_tv = "";

      this.loading = true;
      const params = {
        resourceUrl: this.form.resourceUrl,
      };
      const url = '/api/getPTGenInfoByResourceUrl?' + new URLSearchParams(params).toString();
      let _self = this;
      http.get(url)
          .then((response) => {
            let data = response.data;
            if (data.statusCode === "OK") {
              _self.form.actors = data.data.actors;
              _self.form.category = data.data.category;
              _self.form.description = data.data.description;
              _self.form.englishTitle = data.data.englishTitle;
              _self.form.originalTitle = data.data.originalTitle;
              _self.form.otherTitles = data.data.otherTitles;
              _self.form.year = data.data.year;

              _self.getNameFromTemplate("main_title_tv");
              _self.getNameFromTemplate("second_title_tv");
              _self.getNameFromTemplate("file_name_tv");

            } else {
              _self.$message({
                message: data.message,
                type: 'error'
              });
            }
          }).catch((err) => {
        console.log(err)
        _self.$message({
          message: '请求服务器失败',
          type: 'error'
        });
      }).finally(() => {
        // 无论成功还是失败，都会执行的代码
        this.loading = false
      });
    },

    getScreenshot() {
      this.loading = true;
      const params = {
        path: this.form.filePath
      };
      const url = '/api/getScreenshot?' + new URLSearchParams(params).toString();
      let _self = this;
      http.get(url)
          .then((response) => {
            let data = response.data;
            if (data.statusCode === "OK") {
              _self.form.screenshotPath = data.data.screenshotPath
              for (const screenshot of _self.form.screenshotPath) {
                _self.screenshotPathUrl.push("/api/getFile?filePath=" + screenshot)
              }
            } else {
              _self.$message({
                message: data.message,
                type: 'error'
              });
            }
          }).catch((err) => {
        console.log(err)
        _self.$message({
          message: '请求服务器失败',
          type: 'error'
        });
      }).finally(() => {
        // 无论成功还是失败，都会执行的代码
        this.loading = false
      });
    },

    getThumbnail() {
      this.loading = true;
      const params = {
        path: this.form.filePath
      };
      const url = '/api/getThumbnail?' + new URLSearchParams(params).toString();
      let _self = this;
      http.get(url)
          .then((response) => {
            let data = response.data;
            if (data.statusCode === "OK") {
              _self.form.thumbnailPath = data.data.thumbnailPath
              _self.screenshotPathUrl.push("/api/getFile?filePath=" + _self.form.thumbnailPath)
            } else {
              _self.$message({
                message: data.message,
                type: 'error'
              });
            }
          }).catch((err) => {
        console.log(err)
        _self.$message({
          message: '请求服务器失败',
          type: 'error'
        });
      }).finally(() => {
        // 无论成功还是失败，都会执行的代码
        this.loading = false
      });
    },

    uploadPictures() {
      for (const argument of this.form.screenshotPath) {
        this.uploadPicture(argument)
      }
      if (this.form.thumbnailPath !== "") {
        console.log(this.form.thumbnailPath)
        this.uploadPicture(this.form.thumbnailPath)

      }

    },


    uploadPicture(screenshotPath) {
      this.loading = true
      const params = {
        "picturePath": screenshotPath,
      };
      const url = '/api/uploadPicture?' + new URLSearchParams(params).toString();
      let _self = this;
      http.post(url)
          .then((response) => {
            let data = response.data;
            if (data.statusCode === "OK") {
              if (_self.form.description === undefined) {
                _self.form.description = ""
              }
              _self.form.description = _self.form.description + "\n" + data.data.pictureBbCode
            } else {
              _self.$message({
                message: data.message,
                type: 'error'
              });
            }
          }).catch((err) => {
        console.log(err)
        _self.$message({
          message: '上传图床失败',
          type: 'error'
        });
      }).finally(() => {
        // 无论成功还是失败，都会执行的代码
        this.loading = false
      });
    },


    getMediaInfo() {
      this.loading = true;
      const params = {
        path: this.form.filePath
      };
      const url = '/api/getMediaInfo?' + new URLSearchParams(params).toString();
      let _self = this;
      http.get(url)
          .then((response) => {
            let data = response.data;
            if (data.statusCode === "OK") {
              _self.form.mediaInfo = data.data.mediaInfo
              _self.$message({
                message: data.message,
                type: 'success'
              });
            } else {
              _self.$message({
                message: data.message,
                type: 'error'
              });
            }
          }).catch((err) => {
        console.log(err)
        _self.$message({
          message: '请求服务器失败',
          type: 'error'
        });
      }).finally(() => {
        // 无论成功还是失败，都会执行的代码
        this.loading = false
      });

      let getVideoInfoUrl = '/api/getVideoInfo?' + new URLSearchParams(params).toString();
      http.get(getVideoInfoUrl)
          .then((response) => {
            let data = response.data;
            if (data.statusCode === "OK") {
              _self.form.audioCodec = data.data.audioCodec
              _self.form.bitDepth = data.data.bitDepth
              _self.form.channels = data.data.channels
              _self.form.frameRate = data.data.frameRate
              _self.form.hdrFormat = data.data.hdrFormat
              _self.form.videoCodec = data.data.videoCodec
              _self.form.videoFormat = data.data.videoFormat
              _self.form.videoPath = data.data.videoFormat
              _self.$message({
                message: data.message,
                type: 'success'
              });
            } else {
              _self.$message({
                message: data.message,
                type: 'error'
              });
            }
          }).catch((err) => {
        console.log(err)
        _self.$message({
          message: '请求服务器失败',
          type: 'error'
        });
      }).finally(() => {
        // 无论成功还是失败，都会执行的代码
        this.loading = false
      });


    },

    renameFolder() {
      if (!this.form.filePath) {
        this.$message({
          message: '请选择文件夹',
          type: 'info'
        });
        return
      }

      if (!this.form.file_name_tv) {
        this.$message({
          message: '请先点击【获取信息】，或者手动输入文件名',
          type: 'info'
        });
        return
      }

      this.loading = true
      const path = require('path');
      const params = {
        filePath: this.form.filePath,
        newFileName: this.form.file_name_tv
      };
      const url = '/api/renameFile?' + new URLSearchParams(params).toString();
      let _self = this;
      http.post(url)
          .then((response) => {
            let data = response.data;
            if (data.statusCode === "OK") {
              _self.$message({
                message: data.message,
                type: 'success'
              });
            } else {
              _self.$message({
                message: data.message,
                type: 'error'
              });
            }
          }).catch((err) => {
        console.log(err)
        _self.$message({
          message: '请求服务器失败',
          type: 'error'
        });
      }).finally(() => {
        // 无论成功还是失败，都会执行的代码
        this.loading = false
      });
    },

    renameEpisode() {
      if (!this.form.filePath) {
        this.$message({
          message: '请选择文件夹',
          type: 'info'
        });
        return
      }

      if (!this.form.file_name_tv) {
        this.$message({
          message: '请先点击【获取信息】，或者手动输入文件名',
          type: 'info'
        });
        return
      }

      this.loading = true
      const path = require('path');
      const params = {
        folderPath: this.form.filePath,
        newFileName: this.form.file_name_tv,
        episodeStartNumber: this.form.episodeStartNumber
      };
      const url = '/api/renameEpisode?' + new URLSearchParams(params).toString();
      let _self = this;
      http.post(url)
          .then((response) => {
            let data = response.data;
            if (data.statusCode === "OK") {

              _self.form.filePath = data.data.newFolderPath

              _self.$message({
                message: data.message,
                type: 'success'
              });
            } else {
              _self.$message({
                message: data.message,
                type: 'error'
              });
            }
          }).catch((err) => {
        console.log(err)
        _self.$message({
          message: '请求服务器失败',
          type: 'error'
        });
      }).finally(() => {
        // 无论成功还是失败，都会执行的代码
        this.loading = false
      });


    },
    clearPictures() {
      this.screenshotPathUrl = []
      this.form.screenshotPath = []
      this.form.thumbnailPath = ""
    },
    autoFeed() {
      // auto_feed
      this.$message({
        message: '下版本一定！',
        type: 'info'
      });
    }


  },


}
</script>

<style scoped>

</style>