
<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      type="index"
      :index="indexMethod">
    </el-table-column>
    <el-table-column
      label="注册时间"
      prop="date">
    </el-table-column>
    <el-table-column
      label="用户名"
      prop="name">
    </el-table-column>
     <el-table-column
      label="爱好"
      prop="type">
    </el-table-column>
    <el-table-column
      label="是否VIP"
      prop="delivery">
    </el-table-column>
     <el-table-column
      label="电话"
      prop="tel">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
    data() {
      return {
        tableData: [{
        }],
        search: ''
      }
    },
    methods: {
      insertfun(){
        var that = this
        this.$.ajax({
          type: 'POST',
          url: 'http://106.15.75.186:8080/api/services/app/GsfInit/GetAllasync',
          data: params,
          success: function (response) {
            that.tableData = response.result
          }
        })
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
    mounted(){
      this.insertfun()
    }
  }
</script>

