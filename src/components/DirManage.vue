<template>
  <div id="DirManage">
    <div>
      <el-row :gutter="20">
        <el-col :span="2">
          <label for="">使用范围：</label>
        </el-col>
        <el-col :span="6">
          <div class="distpicker">
            <v-distpicker province="广东省" city="市" area="区"></v-distpicker>
          </div>
        </el-col>
        <el-col :span="6">
          <input type="text">
        </el-col>
        <el-col :span="2">
          <el-button class="find">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="dirTable">
      <el-table :data="tableData" border width="100%">
        <el-table-column prop="number" label="序号" width="80"></el-table-column>
        <el-table-column prop="filename" label="文件标识名称" width="300"></el-table-column>
        <el-table-column prop="city" label="使用地市" min-width="100"></el-table-column>
        <el-table-column prop="county" label="使用县区" min-width="100"></el-table-column>
        <el-table-column prop="district" label="使用镇区或街道办" min-width="200"></el-table-column>
        <el-table-column prop="file" label="三大目录文件" min-width="250"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default{
    data(){
      return {
        tableData: [
          {
            number: 1,
            filename: "惠州市惠来县水丰镇三大目录列表",
            city: "惠州市",
            county: "惠来县",
            district: "水丰镇",
            file: "水丰镇卫生院报销目录"
          },
          {
            number: 2,
            filename: "阳江市阳春市河西街道办",
            city: "阳江市",
            county: "阳春市",
            district: "河西街道办",
            file: "河西医院报销列表"
          }
        ]
      }
    }
  }
</script>
<style lang="scss" scoped>
  #DirManage {
    margin: 15px;
    padding: 15px;
    padding-top: 40px;
    background: #fff;
  }

  label {
    display: block;
    width: 100%;
    height: 36px;
    line-height: 36px;
    text-align: right;
  }

  .el-col {
    input {
      height: 30px;
      width: 100%;
      border: 1px solid #aaa;
      border-radius: 4px;
    }
    .find {
      color: #fff;
      background: #32BC6F;
      border: 0;
    }
  }

  .dirTable {
    margin-top: 30px;
  }

  @media screen and (max-width: 1510px) {
    .el-col-2 {
      width: 12%;
    }
  }
</style>
<style type="text/css">
  .distpicker select {
    width: 32% !important;
    height: 36px;
    line-height: 36px;
    padding: 0.25rem;
    outline: none;
    border: 1px solid #aaa
  }
</style>
