<template>


  <div>

    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 电视剧</el-breadcrumb-item>
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
              <el-select v-model="value" placeholder="请选择"  style="width: 100%">
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
          <el-col :span="6">
            <el-form-item label="第几季" prop="detail">
              <el-input type="number" v-model="form.detail"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="开始于" prop="detail">
              <el-input type="number" v-model="form.detail"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
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
          <el-col :span="6">
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
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  data() {
    return {
      form: {},
      tableData3: [],
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    }
  },
  name: "manage.vue"
}
</script>

<style scoped>

</style>