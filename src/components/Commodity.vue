<template>
<div>
  类别：
  <el-select v-model="SelectValue" placeholder="请选择类别" @change ='parmTableData'>
    <el-option
      v-for="item in Options"
      :key="item.id"
      :label="item.typeName"
      :value="item.id" >
    </el-option>
  </el-select>
   <el-table  :data="tableData" border stripe style="width: 100%">
      <el-table-column label="id" fixed prop="id" align="center" ></el-table-column>
      <el-table-column label="名字" fixed prop="commodityName" align="center"></el-table-column>
      <el-table-column label="图片" prop="" align="center" >
        <template slot-scope="scope">
          <img :src="scope.row.commImage" alt="" width="50%">
        </template>
      </el-table-column>
      <el-table-column label="售价" prop="sellingPrice" align="center" :formatter="dateFormatSelling"></el-table-column>
      <el-table-column label="描述" prop="desc" align="center"> </el-table-column>
      <el-table-column label="注册时间" prop="createTime" align="center" :formatter="dateFormat" sortablealign="center"></el-table-column>
        <el-table-column fixed="right"  align="center">
          <template slot-scope="scope">
            <el-button size="mini">修改</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</div>
</template>
<script lang="js">
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line standard/object-curly-even-spacing
// eslint-disable-next-line no-unused-vars
import { Loading, Message } from 'element-ui'
import moment from 'moment'

export default({
  inject: ['reload'],
  name: 'CommModity',
  data: function () {
    return {
      tableData: [],
      Options: [],
      SelectValue: ''
    }
  },
  methods: {
    parmTableData () {
      var that = this
      let loadingInstance = Loading.service({
        lock: true,
        text: '加载中...',
        background: 'rgba(0,0,0,0.1)',
        targt: '.el-table'
      })
      this.$.ajax({
        type: 'POST',
        url: that.api.baseURL + 'Commodity/GetAllComm',
        data: {ProdSpec: that.SelectValue},
        success: function (response) {
          that.tableData = response.result.items
          that.$nextTick(() => {
            that.tableData = response.result.items
            loadingInstance.close()
          })
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
          that.SelectValue = that.Options[0].id
          let loadingInstance = Loading.service({
            lock: true,
            text: '加载中...',
            background: 'rgba(0,0,0,0.1)',
            targt: '.el-table'
          })
          that.$.ajax({
            type: 'POST',
            url: that.api.baseURL + 'Commodity/GetAllComm',
            data: {ProdSpec: that.Options[0].id},
            success: function (response) {
              that.tableData = response.result.items
              that.$nextTick(() => {
                that.tableData = response.result.items
                loadingInstance.close()
              })
            }
          })
        }
      })
    },
    dateFormat (row, column) {
      const date = new Date(row[column.property])
      if (date === undefined) { return '' }
      return moment(date).format('YYYY-MM-DD')
    },
    dateFormatSelling (row, column) {
      const Selling = row[column.property]
      return Selling + '元'
    },
    handleDelete (index, row) {
      var that = this
      this.$confirm('此操作将永久删除此信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.$axios({
          method: 'GET',
          url: that.api.baseURL + 'Commodity/DeleteComm?CommId=' + row.id
        }).then((response) => { // 这里使用了ES6的语法
          that.$message({
            type: 'success',
            message: '删除成功'
          })
          that.reload()
        }).catch((error) =>
          console.log(error) // 请求失败返回的数据
        )
      })
    }
  },
  created () {
    this.parmOptions()
  }

})
</script>
