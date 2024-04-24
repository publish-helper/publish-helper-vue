<template>

  <div>

    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 电影</el-breadcrumb-item>
        <el-breadcrumb-item>填写</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">

      <el-form ref="form" :model="form" label-width="150px" style="margin-top: 20px; margin-right: 20px">
        <el-form-item label="请输入豆瓣、IMDB等资源链接" prop="detail">
          <el-input type="string" v-model="form.detail"></el-input>
        </el-form-item>

        <el-row>
          <el-col :span="22">
            <el-form-item label="资源路径" prop="detail" style="margin-right: 5px">
              <el-select v-model="value" placeholder="请选择" style="width: 100%">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary">制作种子</el-button>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="来源" prop="detail">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="小组" prop="detail">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>

          <el-col :span="22">
            <el-form-item label="主标题" prop="detail" style="margin-right: 5px">
              <el-input type="textarea" :rows="2" v-model="form.detail"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary">获取</el-button>
          </el-col>
        </el-row>


        <el-form-item label="副标题" prop="detail">
          <el-input type="textarea" :rows="2" v-model="form.detail"></el-input>
        </el-form-item>

        <el-form-item label="文件名" prop="detail">
          <el-input type="textarea" :rows="2" v-model="form.detail"></el-input>
        </el-form-item>
        <el-row>

          <el-col :span="22">
            <el-form-item label="简介" prop="detail" style="margin-right: 5px">
              <el-input type="textarea" :rows="2" v-model="form.detail"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary">获取</el-button>
          </el-col>
        </el-row>
        <el-row>

          <el-col :span="22">
            <el-form-item label="截图" prop="detail" style="margin-right: 5px">
              <el-input type="textarea" :rows="2" v-model="form.detail"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary">获取</el-button>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="22">
            <el-form-item label="Mediainfo" prop="detail" style="margin-right: 5px">
              <el-input type="textarea" :rows="2" v-model="form.detail"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary">获取</el-button>
          </el-col>
        </el-row>

        <el-form-item style="margin-top: 15px">
          <el-button type="primary" @click="onSubmit('form')">万事俱备，一键启动</el-button>
          <el-button>生成auto feed链接</el-button>
        </el-form-item>
      </el-form>


    </div>


  </div>


</template>

<script>
export default {
  name: 'tabs',
  data() {
    return {
      form: {},
      tabActiveName: 'handlingTab',
      defectTableData: [],

      isOpenProcess: false,

      currentPage: 1,
      pageSize: 10,
      defectTotal: 0,

      processStep: 0,
      defectProcess: {}
      ,
      maxValue: 5,
      minValue: 1,
      maxStep: 5,

      dialogImageUrl: '',
      dialogVisible: false,

      fileList: []
    }

  },
  mounted: function () {
    this.flushTabTable()
  },

  methods: {
    changeTab() {
      this.flushTabTable()
    },

    flushTabTable() {
      let status = "正在处理";
      if (this.tabActiveName === 'handlingTab') {
        status = "正在处理"
      } else if (this.tabActiveName === 'closeTab') {
        status = "已闭环"
      }
      let _self = this;
      this.$axios.get(`/defect/list/status/` + status + '?pageNum='
          + this.currentPage + '&pageSize=' + this.pageSize)
          .then((response) => {
            let resBody = response.data;
            _self.defectTotal = resBody.total
            _self.defectTableData = resBody.tableData;
          })
    },

    handleSizeChange(val) {
      this.pageSize = val
      // console.log(`每页 ${val} 条`);
      this.flushTabTable()

    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}` + this.currentPage);
      this.flushTabTable()
    },

    openDefectInfo(row) {
      this.defectProcess = row;
      this.isOpenProcess = true;
      this.processStep = Number(row.step);
      this.maxStep = Number(row.step);
    },
    acceptDefectTable() {
      let _self = this
      if (localStorage.getItem("workId") === _self.defectProcess.toAcceptWorkId) {
        this.$axios.get(`/defect/accept/` + this.defectProcess.uuid)
            .then((response) => {
              let resBody = response.data;
              _self.processStep = 2
              _self.maxStep = 2
            })
      } else {
        _self.$message({
          message: '您不是接受人，无权限接受',
          type: 'error'
        });
      }
    },

    acceptMarkSubmit() {
      let _self = this
      if (localStorage.getItem("workId") === _self.defectProcess.toAcceptWorkId) {
        let body = {
          uuid: this.defectProcess.uuid,
          acceptMark: this.defectProcess.acceptMark
        }
        this.$axios.post(`/defect/accept/mark`, body)
            .then((response) => {
              let resBody = response.data;
              _self.processStep = 3
              _self.maxStep = 3
            })
      } else {
        _self.$message({
          message: '您不是处理人，无权限处理',
          type: 'error'
        });
      }


    },


    handleMarkSubmit() {
      let _self = this
      console.log(this.fileList)
      if (localStorage.getItem("workId") === _self.defectProcess.toAcceptWorkId) {
        let body = {
          uuid: this.defectProcess.uuid,
          fileList: this.fileList,
          handleMark: this.defectProcess.handleMark
        }
        this.$axios.post(`/defect/handle/mark`, body)
            .then((response) => {
              let resBody = response.data;
              _self.defectProcess.imageArr = resBody.fileNames
              _self.processStep = 4
              _self.maxStep = 4
            })

      }
    },

    closeSubmit() {
      let _self = this
      if (localStorage.getItem("workId") === _self.defectProcess.findWorkId) {
        let body = {
          uuid: this.defectProcess.uuid,
          closeMark: this.defectProcess.closeMark
        }
        this.$axios.post(`/defect/close/mark`, body)
            .then((response) => {
              let resBody = response.data;
              _self.processStep = 5
              _self.maxStep = 5
            })

      }
    },

    handleClose(done) {
      this.flushTabTable();
      done();
    },


    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    fileUploadSuccess(response, file, fileList) {
      this.fileList = fileList
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
</style>
