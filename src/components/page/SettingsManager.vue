<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 配置</el-breadcrumb-item>
        <el-breadcrumb-item>填写</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form_box_1"
           style="background-color: #ffffff;border: 1px solid #dddddd; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); margin-inside: 20px; margin-outside: 20px; margin-bottom: 20px">
        <el-form ref="form" :model="settings_form" label-width="150px" style="margin-top: 20px; margin-right: 20px">
          <el-form-item label="PT Gen地址" prop="detail">
            <el-input type="string" v-model="settings_form.pt_gen_api_url"></el-input>
          </el-form-item>
          <el-form-item label="图床API地址" prop="detail">
            <el-input type="string" v-model="settings_form.picture_bed_api_url"></el-input>
          </el-form-item>
          <el-form-item label="图床API令牌" prop="detail">
            <el-input type="string" v-model="settings_form.picture_bed_api_token"></el-input>
          </el-form-item>
          <el-form-item label="截图存储地址" prop="detail">
            <el-row>
              <el-col :span="20">
                <el-input type="string" v-model="settings_form.screenshot_storage_path"></el-input>
              </el-col>
              <el-col :span="4">
                <el-button>浏览</el-button>
              </el-col>
            </el-row>

          </el-form-item>

          <el-form-item label="种子存储地址" prop="detail">
            <el-row>
              <el-col :span="20">
                <el-input type="string" v-model="settings_form.torrent_storage_path"></el-input>
              </el-col>
              <el-col :span="4">
                <el-button>浏览</el-button>
              </el-col>
            </el-row>
          </el-form-item>

          <el-row>
            <el-col :span="12">
              <el-form-item label="截图数量" prop="detail">
                <el-input type="number" v-model="settings_form.screenshot_number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="关键帧复杂度" prop="detail">
                <el-input type="number" v-model="settings_form.screenshot_threshold"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="截图起始点（%）" prop="detail">
                <el-input type="number" v-model="settings_form.screenshot_start_percentage"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="截图终止点（%）" prop="detail">
                <el-input type="number" v-model="settings_form.screenshot_end_percentage"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6">
              <el-form-item label="自动上传图床" prop="detail">
                <el-switch
                    v-model="settings_form.auto_upload_screenshot"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="链接粘贴到简介后" prop="detail">
                <el-switch
                    v-model="settings_form.paste_screenshot_url"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="上传后删除本地图片" prop="detail">
                <el-switch
                    v-model="settings_form.delete_screenshot"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Mediainfo工具后缀" prop="detail">
                <el-switch
                    v-model="settings_form.media_info_suffix"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6">
              <el-form-item label="生成缩略图" prop="detail">
                <el-switch
                    v-model="settings_form.do_get_thumbnail"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="横向数量" prop="detail">
                <el-input type="number" v-model="settings_form.thumbnail_rows"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="纵向数量" prop="detail">
                <el-input type="number" v-model="settings_form.thumbnail_cols"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="上传延迟(s)" prop="detail">
                <el-input type="number" v-model="settings_form.thumbnail_delay"></el-input>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row>
            <el-col :span="6">
              <el-form-item label=" 获取标准命名时：" prop="detail">

              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="自动将文件（文件夹）重命名" prop="detail" label-width="200px">
                <el-switch
                    v-model="settings_form.rename_file"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="将电影文件放入同名文件夹" prop="detail" label-width="200px">
                <el-switch
                    v-model="settings_form.make_dir"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="二次确认文件名" prop="detail">
                <el-switch
                    v-model="settings_form.second_confirm_file_name"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="链接" prop="detail">
            <el-input type="string" v-model="settings_form.auto_feed_link"></el-input>
          </el-form-item>
          <el-form-item label="获取auto feed链接后自动打开链接(默认浏览器需安装auto feed脚本)" prop="detail"
                        label-width="70%">
            <el-switch
                v-model="settings_form.open_auto_feed_link"
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
        </el-form>
      </div>

      <div class="form_box_2"
           style="background-color: #ffffff;border: 1px solid #dddddd; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); margin-inside: 10px; margin-outside: 10px; margin-bottom: 10px">


        <el-tabs v-model="form2_type" @tab-click="handleClick" type="card" style="margin-top: 10px; margin-left: 10px">
          <el-tab-pane label="电影" name="first">
            <el-form ref="form" :model="form" label-width="150px" style="margin-top: 20px; margin-right: 20px">
              <el-form-item label="主标题" prop="detail">
                <el-input type="string" v-model="settings_form.main_title_movie"></el-input>
              </el-form-item>
              <el-form-item label="副标题" prop="detail">
                <el-input type="string" v-model="settings_form.second_title_movie"></el-input>
              </el-form-item>
              <el-form-item label="文件名" prop="detail">
                <el-input type="string" v-model="settings_form.file_name_movie"></el-input>
              </el-form-item>

            </el-form>
          </el-tab-pane>
          <el-tab-pane label="剧集" name="second">
            <el-form ref="form" :model="form" label-width="150px" style="margin-top: 20px; margin-right: 20px">
              <el-form-item label="主标题" prop="detail">
                <el-input type="string" v-model="settings_form.main_title_tv"></el-input>
              </el-form-item>
              <el-form-item label="副标题" prop="detail">
                <el-input type="string" v-model="settings_form.second_title_tv"></el-input>
              </el-form-item>
              <el-form-item label="文件名" prop="detail">
                <el-input type="string" v-model="settings_form.file_name_tv"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="短剧" name="third">
            <el-form ref="form" :model="form" label-width="150px" style="margin-top: 20px; margin-right: 20px">

              <el-form-item label="主标题" prop="detail">
                <el-input type="string" v-model="settings_form.main_title_playlet"></el-input>
              </el-form-item>
              <el-form-item label="副标题" prop="detail">
                <el-input type="string" v-model="settings_form.second_title_playlet"></el-input>
              </el-form-item>
              <el-form-item label="文件名" prop="detail">
                <el-input type="string" v-model="settings_form.file_name_playlet"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>

      <el-row>
        <el-col :span="24">
          <el-button style="width: 100%" type="primary" @click="onSubmit('form')">保存！！！</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

import http from '@/utils/http';

export default {
  name: 'settings_manager',
  data() {
    return {
      settings_form: {
        api_port: "5372",
        auto_feed_link: "https://example.com/upload.php#seperator#name#linkstr#{主标题}#linkstr#small_descr#linkstr#{副标题}#linkstr#url#linkstr#{IMDB}#linkstr#dburl#linkstr#{豆瓣}#linkstr#descr#linkstr#{简介}[quote]{MediaInfo}[/quote]#linkstr#log_info#linkstr##linkstr#tracklist#linkstr##linkstr#music_type#linkstr##linkstr#music_media#linkstr##linkstr#edition_info#linkstr##linkstr#music_name#linkstr##linkstr#music_author#linkstr##linkstr#animate_info#linkstr##linkstr#anidb#linkstr##linkstr#torrentName#linkstr##linkstr#images#linkstr##linkstr#torrent_name#linkstr#{种子名称}#linkstr#torrent_url#linkstr#{种子链接}#linkstr#type#linkstr#{类型}#linkstr#source_sel#linkstr#{地区}#linkstr#standard_sel#linkstr#{分辨率}#linkstr#audiocodec_sel#linkstr#{音频编码}#linkstr#codec_sel#linkstr#{视频编码}#linkstr#medium_sel#linkstr#{媒介}#linkstr#origin_site#linkstr#{小组}#linkstr#origin_url#linkstr##linkstr#golden_torrent#linkstr#false#linkstr#mediainfo_cmct#linkstr##linkstr#imgs_cmct#linkstr##linkstr#full_mediainfo#linkstr##linkstr#subtitles#linkstr##linkstr#youtube_url#linkstr##linkstr#ptp_poster#linkstr##linkstr#comparisons#linkstr##linkstr#version_info#linkstr##linkstr#multi_mediainfo#linkstr##linkstr#labels#linkstr#0",
        auto_upload_screenshot: "True",
        delete_screenshot: "True",
        do_get_thumbnail: "True",
        enable_api: "True",
        file_name_movie: "{original_title}.{en_title}.{year}.{video_format}.{source}.{video_codec}.{bit_depth}.{hdr_format}.{frame_rate}.{audio_codec}.{channels}.{audio_num}-{team}",
        file_name_playlet: "{original_title}.{en_title}.S{season}E{episode}.{year}.{video_format}.{source}.{video_codec}.{bit_depth}.{hdr_format}.{frame_rate}.{audio_codec}.{channels}.{audio_num}-{team}",
        file_name_tv: "{original_title}.{en_title}.S{season}E{episode}.{year}.{video_format}.{source}.{video_codec}.{bit_depth}.{hdr_format}.{frame_rate}.{audio_codec}.{channels}.{audio_num}-{team}",
        main_title_movie: "{en_title} {year} {video_format} {source} {video_codec} {bit_depth} {hdr_format} {frame_rate} {audio_codec} {channels} {audio_num}-{team}",
        main_title_playlet: "{en_title} S{season} {year} {video_format} {source} {video_codec} {bit_depth} {hdr_format} {frame_rate} {audio_codec} {channels} {audio_num}-{team}",
        main_title_tv: "{en_title} S{season} {year} {video_format} {source} {video_codec} {bit_depth} {hdr_format} {frame_rate} {audio_codec} {channels} {audio_num}-{team}",
        make_dir: "True",
        media_info_suffix: "True",
        open_auto_feed_link: "True",
        paste_screenshot_url: "True",
        picture_bed_api_token: "6d207e02198a847aa98d0a2a901485a5",
        picture_bed_api_url: "https://freeimage.host/api/1/upload",
        pt_gen_api_url: "https://ptgen.agsvpt.work/",
        rename_file: "True",
        screenshot_end_percentage: "0.90",
        screenshot_number: "3",
        screenshot_start_percentage: "0.10",
        screenshot_storage_path: "temp/pic",
        screenshot_threshold: "30.0",
        second_confirm_file_name: "True",
        second_title_movie: "{original_title} / {other_titles} | 类型：{category} | 演员：{actors}",
        second_title_playlet: "{original_title} | 第{season_number}季 | {total_episode} | {year}年 | {playlet_source} | 类型：{category}",
        second_title_tv: "{original_title} / {other_titles} | {total_episode} | 类型：{category} | 演员：{actors}",
        thumbnail_cols: "3",
        thumbnail_delay: "2.0",
        thumbnail_rows: "3",
        torrent_storage_path: "temp/torrent"
      },
      form2_type: "first",
    }
  },

  mounted: function () {
    this.get_settings()
  },

  methods: {

    get_settings() {
      let _self = this;
      http.get(`/api/settings`)
          .then((response) => {
            _self.settings_form = response.data.data.settings;
          }).catch((err) => {
        console.log(err)
        _self.$message({
          message: '获取配置失败',
          type: 'error'
        });
      })

    },

    onSubmit() {
      let _self = this;
      http.post(`/api/settings/update`, this.settings_form)
          .then((response) => {
            let data = response.data;
            if (data.statusCode === "OK") {
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
      })
    },

    changePosition(value) {
      let _self = this;
      this.form.toAcceptWorkId = "";
      http.get(`/user/search/position/` + value)
          .then((response) => {
            let userList = response.data;
            _self.userOptions = userList
            if (userList.length > 0) {
              _self.form.toAcceptWorkId = userList[0].workId;
            }

          }).catch((err) => {
        _self.$message({
          message: '提交失败',
          type: 'error'
        });
      })
    },

  }
}
</script>