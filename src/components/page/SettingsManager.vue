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
        <el-form ref="form" :model="form" label-width="150px" style="margin-top: 20px; margin-right: 20px">
          <el-form-item label="PT Gen详情" prop="detail">
            <el-input type="string" v-model="form.detail"></el-input>
          </el-form-item>
          <el-form-item label="图床API地址" prop="detail">
            <el-input type="string" v-model="form.detail"></el-input>
          </el-form-item>
          <el-form-item label="图床API令牌" prop="detail">
            <el-input type="string" v-model="form.detail"></el-input>
          </el-form-item>
          <el-form-item label="截图存储地址" prop="detail">
            <el-row>
              <el-col :span="20">
                <el-input type="string" v-model="form.detail"></el-input>
              </el-col>
              <el-col :span="4">
                <el-button>浏览</el-button>
              </el-col>
            </el-row>

          </el-form-item>

          <el-form-item label="种子存储地址" prop="detail">
            <el-row>
              <el-col :span="20">
                <el-input type="string" v-model="form.detail"></el-input>
              </el-col>
              <el-col :span="4">
                <el-button>浏览</el-button>
              </el-col>
            </el-row>
          </el-form-item>

          <el-row>
            <el-col :span="12">
              <el-form-item label="截图数量" prop="detail">
                <el-input type="number" v-model="form.detail"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="关键帧复杂度" prop="detail">
                <el-input type="number" v-model="form.detail"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="截图起始点（%）" prop="detail">
                <el-input type="number" v-model="form.detail"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="截图终止点（%）" prop="detail">
                <el-input type="number" v-model="form.detail"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6">
              <el-form-item label="自动上传图床" prop="detail">
                <el-switch
                    v-model="value"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="链接粘贴到简介后" prop="detail">
                <el-switch
                    v-model="value"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="上传后删除本地图片" prop="detail">
                <el-switch
                    v-model="value"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Mediainfo工具后缀" prop="detail">
                <el-switch
                    v-model="value"
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
                    v-model="value"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="横向数量" prop="detail">
                <el-input type="number" v-model="form.detail"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="纵向数量" prop="detail">
                <el-input type="number" v-model="form.detail"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="上传延迟(s)" prop="detail">
                <el-input type="number" v-model="form.detail"></el-input>
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
                    v-model="value"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="将电影文件放入同名文件夹" prop="detail" label-width="200px">
                <el-switch
                    v-model="value"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="二次确认文件名" prop="detail">
                <el-switch
                    v-model="value"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item style="margin-top: 15px">
            <el-button type="primary" @click="onSubmit('form')">提交</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="form_box_2"
           style="background-color: #ffffff;border: 1px solid #dddddd; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); margin-inside: 20px; margin-outside: 20px; margin-bottom: 20px">


        <el-tabs v-model="form2_type" @tab-click="handleClick" type="card" style="margin-top: 10px; margin-left: 10px">
          <el-tab-pane label="电影" name="first">
            <el-form ref="form" :model="form" label-width="150px" style="margin-top: 20px; margin-right: 20px">

              <el-form-item label="PT Gen详情" prop="detail">
                <el-input type="string" v-model="form.detail"></el-input>
              </el-form-item>
              <el-form-item label="主标题" prop="detail">
                <el-input type="string" v-model="form.detail"></el-input>
              </el-form-item>
              <el-form-item label="副标题" prop="detail">
                <el-input type="string" v-model="form.detail"></el-input>
              </el-form-item>
              <el-form-item label="文件名" prop="detail">
                <el-input type="string" v-model="form.detail"></el-input>
              </el-form-item>
              <el-form-item label="占位符" prop="detail">
                <el-input type="textarea" :rows="6" v-model="form.detail"></el-input>
              </el-form-item>
              <el-form-item style="margin-top: 15px">
                <el-button type="primary" @click="onSubmit('form')">提交</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="剧集" name="second">
                        <el-form ref="form" :model="form" label-width="150px" style="margin-top: 20px; margin-right: 20px">

              <el-form-item label="PT Gen详情" prop="detail">
                <el-input type="string" v-model="form.detail"></el-input>
              </el-form-item>
              <el-form-item label="主标题" prop="detail">
                <el-input type="string" v-model="form.detail"></el-input>
              </el-form-item>
              <el-form-item label="副标题" prop="detail">
                <el-input type="string" v-model="form.detail"></el-input>
              </el-form-item>
              <el-form-item label="文件名" prop="detail">
                <el-input type="string" v-model="form.detail"></el-input>
              </el-form-item>
              <el-form-item label="占位符" prop="detail">
                <el-input type="textarea" :rows="6" v-model="form.detail"></el-input>
              </el-form-item>
              <el-form-item style="margin-top: 15px">
                <el-button type="primary" @click="onSubmit('form')">提交</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="短剧" name="third">
                        <el-form ref="form" :model="form" label-width="150px" style="margin-top: 20px; margin-right: 20px">

              <el-form-item label="PT Gen详情" prop="detail">
                <el-input type="string" v-model="form.detail"></el-input>
              </el-form-item>
              <el-form-item label="主标题" prop="detail">
                <el-input type="string" v-model="form.detail"></el-input>
              </el-form-item>
              <el-form-item label="副标题" prop="detail">
                <el-input type="string" v-model="form.detail"></el-input>
              </el-form-item>
              <el-form-item label="文件名" prop="detail">
                <el-input type="string" v-model="form.detail"></el-input>
              </el-form-item>
              <el-form-item label="占位符" prop="detail">
                <el-input type="textarea" :rows="6" v-model="form.detail"></el-input>
              </el-form-item>
              <el-form-item style="margin-top: 15px">
                <el-button type="primary" @click="onSubmit('form')">提交</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>

      <div class="form_box_3"
           style="background-color: #ffffff;border: 1px solid #dddddd; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); margin-inside: 20px; margin-outside: 20px; margin-bottom: 20px">

        <el-form ref="form" :model="form" label-width="150px" style="margin-top: 20px; margin-right: 20px">
          <el-form-item label="链接" prop="detail">
            <el-input type="string" v-model="form.detail"></el-input>
          </el-form-item>
          <el-form-item label="获取auto feed链接后自动打开链接(默认浏览器需安装auto feed脚本)" prop="detail"
                        label-width="60%">
            <el-switch
                v-model="value"
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
        </el-form>
      </div>


    </div>


  </div>
</template>

<script>
export default {
  name: 'settings_manager',
  data() {
    return {
      form2_type: "first",
      positionOptions: [],
      userOptions: [],
      form: {
        company: "",
        unit: "",
        toAcceptWorkId: "",
        type: "",
        detail: "",
      },
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    onSubmit(form) {
      let _self = this;
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$axios.post(`/defect/add`, this.form)
              .then((response) => {
                let data = response.data;
                if (data.code === "200") {
                  _self.$message({
                    message: '提交成功',
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
        } else {
          console.log('提交失败');
        }
      });
    },

    changePosition(value) {
      let _self = this;
      this.form.toAcceptWorkId = "";
      this.$axios.get(`/user/search/position/` + value)
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


    handleRemove(file, fileList) {
      console.log(file, fileList);
    },


    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  }
}
</script>