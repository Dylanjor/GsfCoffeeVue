<template>
<div>
  <!-- 总的用户table -->
  <el-select v-model="item" placeholder="请选择类别">
    <el-option
      v-for="item in Options"
      :key="item.id"
      :label="item.typeName"
      :value="item.typeName">
    </el-option>
  </el-select>
   <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column label="id" fixed prop="id" align="center" width="80"></el-table-column>
      <el-table-column label="名字" fixed prop="name" align="center" width="80"></el-table-column>
      <el-table-column label="密码" prop="passWord" align="center" width="80"></el-table-column>
      <el-table-column label="性别" prop="resource" align="center" width="80" ></el-table-column>
      <el-table-column label="爱好" prop="type" align="center" width="120" > </el-table-column>
      <el-table-column label="注册时间" prop="createTime" :formatter="dateFormat" sortablealign="center" width="230"></el-table-column>
      <el-table-column label="最近一次修改时间" prop="updateTime" sortable :formatter="dateFormat" align="center" width="240" ></el-table-column>
      <el-table-column label="电话" prop="tel" align="center" width="140" ></el-table-column>
       <el-table-column label="账号" prop="numbering" align="center" width="140" ></el-table-column>
      <el-table-column label="是否弃用" prop="deprecated" align="center" width="100" :formatter="formatterColumn" ></el-table-column>
      <el-table-column label="弃用时间" prop="deprecatedTime" align="center" width="100" :formatter="dateFormat" ></el-table-column>
      <el-table-column fixed="right" width="150" align="right"> <templateslot="header">
        <templateslot-scope="scope">
          <el-button size="mini" @click="getshoppingDetails(scope.row)">购物</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
      </el-table-column>
    </el-table>
</div>
</template>
<script lang="js">
export default({
  name: 'CommModity',
  data: function () {
    return {
      tableData: [],
      Options: []
    }
  },
  methods: {
    parmTableData () {
      var that = this
      this.$.ajax({
        type: 'POST',
        url: that.api.baseURL + '',
        success: function (response) {
          
        }
      })
    },
    parmOptions () {
      var that = this
      this.$.ajax({
        type: 'POST',
        url: that.api.baseURL + 'ProdSpec/GetAllList',
        success: function (response) {
          that.Options = response.result.items
        }
      })
    }
  },
  created () {
    this.parmTableData()
    this.parmOptions()
  }
})
</script>
