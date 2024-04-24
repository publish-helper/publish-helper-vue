<template>

  <div>

    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 短剧</el-breadcrumb-item>
        <el-breadcrumb-item>填写</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">

      <el-form ref="form" :model="form" label-width="80px" style="margin-top: 20px; margin-right: 20px">


        <el-row>
          <el-col :span="10">
            <el-form-item label="资源名称" prop="detail">
              <el-input type="string" v-model="form.detail"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发布年份" prop="detail">
              <el-input type="date" v-model="form.detail" style="width: 100%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="季" prop="detail">
              <el-input type="number" v-model="form.detail"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="开始集" prop="detail">
              <el-input type="number" v-model="form.detail"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="4">
            <el-form-item label="产地" prop="detail">
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
          <el-col :span="4">
            <el-form-item label="语言" prop="detail">
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
          <el-col :span="6">
            <el-form-item label="短剧来源" prop="detail">
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
          <el-col :span="6">
            <el-form-item label="资源来源" prop="detail">
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
          <el-col :span="4">
            <el-form-item label="小组" prop="detail">
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
        </el-row>


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
          <el-col :span="22">
            <el-form-item label="封面路径" prop="detail" style="margin-right: 5px">
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
            <el-button type="primary">上传</el-button>
          </el-col>
        </el-row>


        <el-form-item label="" prop="detail">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="剧情" disabled></el-checkbox>
            <el-checkbox label="爱情" disabled></el-checkbox>
            <el-checkbox label="喜剧" disabled></el-checkbox>
            <el-checkbox label="甜虐" disabled></el-checkbox>
            <el-checkbox label="甜宠" disabled></el-checkbox>
            <el-checkbox label="恐怖" disabled></el-checkbox>
            <el-checkbox label="动作" disabled></el-checkbox>
            <el-checkbox label="穿越" disabled></el-checkbox>
            <el-checkbox label="重生" disabled></el-checkbox>
            <el-checkbox label="逆袭" disabled></el-checkbox>
            <el-checkbox label="科幻" disabled></el-checkbox>
            <el-checkbox label="武侠" disabled></el-checkbox>
            <el-checkbox label="都市" disabled></el-checkbox>
            <el-checkbox label="古装" disabled></el-checkbox>
            <el-checkbox label="神豪" disabled></el-checkbox>
            <el-checkbox label="霸总" disabled></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

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
  name: "UserManager",
  data: function () {
    return {
      form: {},
      userTableData: [],

      currentPage: 1,
      pageSize: 10,
      userTotal: 0,

      isOpenAddUser: false,
      positionList: [],

      sexOptions: [],

      powerGenerationDefaultOptions: [],

      maintenanceDefaultOptions: [],

      addUserForm: {
        workId: "",
        name: "",
        sex: "男",
        identityCard: "",
        department: "发电部",
        position: "集控巡检",
        tel: ""
      },
      addUserFormRules: {
        workId: [
          {required: true, message: '请输入工号', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '请选择性别', trigger: 'change'}
        ],
        identityCard: [
          {required: true, message: '请输入身份证号', trigger: 'blur'},
          {min: 10, max: 18, message: '请输入18位手机号', trigger: 'blur'}
        ],
        position: [
          {required: true, message: '请选择专业', trigger: 'change'}
        ],
        tel: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {min: 11, max: 11, message: '请输入11位手机号', trigger: 'blur'}
        ]
      }

    }
  },
  mounted: function () {
    this.flush();
  },
  methods: {
    openAddUser() {
      this.addUserForm.workId = "";
      this.addUserForm.identityCard = "";
      this.addUserForm.tel = "";
      this.addUserForm.name = "";
      this.isOpenAddUser = true;
    },

    flush() {
      // let _self = this
      // this.$axios.get(`/user/list?pageNum=` + this.currentPage + '&pageSize=' + this.pageSize)
      //     .then((response) => {
      //         let data = response.data
      //         this.userTableData = data.userList;
      //         this.userTotal = data.userTotal
      //     }).catch((err) => {
      //     _self.$message({
      //         message: '服务器错误',
      //         type: 'error'
      //     });
      // })
    },

    handleClose(done) {
      done();
    },

    onSubmitAddUser(formName) {
      let _self = this;
      this.$axios.post(`/user/addUser`, this.addUserForm)
          .then((response) => {
            let data = response.data;
            if (data.code === "200") {
              _self.isOpenAddUser = false;
              _self.$message({
                message: '提交成功',
                type: 'success'
              });
            } else {
              _self.$message({
                message: data.msg,
                type: 'error'
              });
            }
            _self.flush()
          })
          .catch((err) => {
            _self.$message({
              message: '提交失败',
              type: 'error'
            });
          })

    },


    openDeleteUserMessage(workId) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteUser(workId)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },


    getUserRole() {
      return localStorage.getItem("role")
    },

    deleteUser(workId) {
      let _self = this
      this.$axios.delete(`/user/` + workId)
          .then((response) => {
            let data = response.data;
            if (data.code === "200") {
              _self.$message({
                message: '操作成功',
                type: 'success'
              });
            } else {
              _self.$message({
                message: data.msg,
                type: 'error'
              });
            }
            _self.flush()
          })
          .catch((err) => {
            _self.$message({
              message: '操作失败',
              type: 'error'
            });
          })
    },

    handleSizeChange(val) {
      this.pageSize = val
      // console.log(`每页 ${val} 条`);
      this.flush()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}` + this.currentPage);
      this.flush()
    }
  }
}
</script>

<style scoped>

</style>