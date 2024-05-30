<template>
  <div class="login-wrap">
    <div class="ms-title">未发布，账号密码随便填</div>
    <div class="ms-login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="workId">
          <el-input v-model="ruleForm.workId" placeholder="username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="ruleForm.password"
                    @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
        <p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码随便填。</p>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      ruleForm: {
        workId: '',
        password: ''
      },
      rules: {
        workId: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm(ruleForm) {
      let _self = this;
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          // 随意登录
          localStorage.setItem('ms_username', "admin");
          localStorage.setItem('token', "data.token");
          localStorage.setItem('workId', "data.workId");
          localStorage.setItem('role', "admin");
          this.$router.push('/');
          //   this.$axios.post(`/login`, this.ruleForm)
          //       .then((response) => {
          //         let data = response.data;
          //         if (data.code === "200") {
          //           _self.$message({
          //             message: '登陆成功',
          //             type: 'success'
          //           });
          //           localStorage.setItem('ms_username', data.name);
          //           localStorage.setItem('token', data.token);
          //           localStorage.setItem('workId', data.workId);
          //           localStorage.setItem('role', data.role);
          //           this.$router.push('/');
          //         } else {
          //           _self.$message({
          //             message: '账号或者密码错误',
          //             type: 'error'
          //           });
          //         }
          //       }).catch((err) => {
          //     console.log(err)
          //     _self.$message({
          //       message: '服务器错误',
          //       type: 'error'
          //     });
          //   })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}

.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  color: #fff;

}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 160px;
  margin: -150px 0 0 -190px;
  padding: 40px;
  border-radius: 5px;
  background: #fff;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
}
</style>