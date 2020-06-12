<style>
@import url(../css/Import.css);
</style>
<template>
<div>
  <el-row class="padding-10-0">
    <el-upload
        class="upload-demo float inline-block"
        action=""
        :on-change="handleChange"
        :on-exceed="handleExceed"
        :on-remove="handleRemove"
        :file-list="fileListUpload"
        :limit="limitUpload"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
        :auto-upload="false">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只 能 上 传 xlsx / xls 文 件</div>
    </el-upload>
    <el-button size="small" class="float" type="success" @click="InsertDataTable">保存到数据库</el-button>
    <el-button size="small" class="float" type="success" @click="GetDataTable">数据库获取所有数据</el-button>
    <el-button size="small" class="float" type="danger" @click="OutTable">导出Excel</el-button>
    <el-button size="small" class="float" type="info">数据类型:{{this.NOWTableType}}</el-button>
  </el-row>
    <el-table
      :data="tableData"
      id="out-table"
      @cell-click="open"
      :cell-class-name='getCellIndex'
      style="width: 100%">
      <el-table-column
        prop="datetime"
        max-width="200"
        column-key="date"
        label="日期"
        :formatter="dateFormat">
      </el-table-column>
      <el-table-column
        prop="shift"
        label="班次"
        max-width="120">
      </el-table-column>
      <el-table-column
        prop="onduty"
        label="值班"
        max-width="120">
      </el-table-column>
      <el-table-column
        prop="site"
        label="场地"
        max-width="200">
      </el-table-column>
      <el-table-column
        prop="shipname"
        label="船名"
        max-width="200">
      </el-table-column>
      <el-table-column
        prop="consignor"
        label="货主"
        max-width="200">
      </el-table-column>
      <el-table-column
        prop="jobtype"
        label="作业类型"
        max-width="200">
      </el-table-column>
      <el-table-column
        prop="team"
        label="班组"
        max-width="120">
      </el-table-column>
      <el-table-column
        prop="workload"
        label="作业量"
        max-width="120">
      </el-table-column>
      <el-table-column
        prop="planQty"
        label="计划量"
        max-width="200">
      </el-table-column>
      <el-table-column
        prop="remarks"
        label="备注"
        max-width="200">
      </el-table-column>
    </el-table>
</div>
</template>
<script>
import moment from 'moment'
// eslint-disable-next-line no-unused-vars
import { Message } from 'element-ui'
// eslint-disable-next-line no-unused-vars
import FileSaver from 'file-saver'
// eslint-disable-next-line no-unused-vars
import XLSX from 'xlsx'

export default {
  inject: ['reload'],
  name: 'Import',
  data () {
    return {
      fileListUpload: [],
      fileTemp: null,
      limitUpload: 1,
      tableList: [],
      tableData: [],
      NOWTableType: '无'
    }
  },
  methods: {
    getCellIndex: function ({ row, column, rowIndex, columnIndex }) {
      row.index = rowIndex
      column.index = columnIndex
    },
    handleChange (file, fileList) {
      this.fileTemp = file.raw
      this.tableData = []
      if (this.fileTemp) {
        if ((this.fileTemp.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') || (this.fileTemp.type === 'application/vnd.ms-excel')) {
          this.importfxx(this.fileTemp)
        } else {
          this.$message({
            type: 'warning',
            message: '附件格式错误，请删除后重新上传！'
          })
        }
      } else {
        this.$message({
          type: 'warning',
          message: '请上传附件！'
        })
      }
    },
    handleRemove (file, fileList) {
      this.fileTemp = null
      this.tableData = []
      this.NOWTableType = '无'
    },
    importfxx (obj) {
      // eslint-disable-next-line no-unused-vars
      let _this = this
      // 通过DOM取文件数据
      this.file = obj
      var rABS = false // 是否将文件读取为二进制字符串
      var f = this.file
      var reader = new FileReader()
      // if (!FileReader.prototype.readAsBinaryString) {
      FileReader.prototype.readAsBinaryString = function (f) {
        var binary = ''
        var rABS = false // 是否将文件读取为二进制字符串
        // eslint-disable-next-line no-unused-vars
        var pt = this
        var wb // 读取完成的数据
        var outdata
        var reader = new FileReader()
        reader.onload = function (e) {
          var bytes = new Uint8Array(reader.result)
          var length = bytes.byteLength
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i])
          }
          var XLSX = require('xlsx')
          if (rABS) {
            // eslint-disable-next-line no-undef
            wb = XLSX.read(btoa(fixdata(binary)), { // 手动转化
              type: 'base64'
            })
          } else {
            wb = XLSX.read(binary, {
              type: 'binary'
            })
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])// outdata就是你想要的东西
          //   console.log(JSON.stringify(outdata))
          this.da = [...outdata]
          var zuoye = ''
          this.da.map(v => {
            // eslint-disable-next-line no-unused-vars
            var a = v['__EMPTY']
            if (a) {
              if (a.indexOf('作业') !== -1) {
                zuoye = v['__EMPTY']
              }
            }
            if (v['__EMPTY_1'] && v['__EMPTY_1'] !== '垛位号' && v['__EMPTY_1'] !== '作业内容' && v['__EMPTY_1'] !== '项目') {
              let obj = {
                'datetime': new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + (new Date().getDate() - 1),
                'site': v['__EMPTY_1'],
                'shipname': v['__EMPTY_2'] ? v['__EMPTY_2'] : '无',
                'consignor': v['__EMPTY_4'] ? v['__EMPTY_4'] : '无',
                'jobtype': v['__EMPTY_3'] + zuoye,
                'shift': new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + (new Date().getDate() - 1) + '白班',
                'onduty': '李宁',
                'team': '一班',
                'workload': 0,
                'planQty': 0,
                'remarks': '无'
              }
              _this.tableData.push(obj)
            }
            // console.log(JSON.stringify(v))
          })
        }
        reader.readAsArrayBuffer(f)
        _this.NOWTableType = '导入表格'
      }

      if (rABS) {
        reader.readAsArrayBuffer(f)
      } else {
        reader.readAsBinaryString(f)
      }
    },
    handleExceed (file, fileList) {
      this.$message({
        type: 'warning',
        message: '目前只允许上传一个Excel'
      })
    },
    open (row, column, event, cell) {
      // eslint-disable-next-line no-unused-vars
      var Data = this.tableData[row.index][column.property]
      console.log(column)
      // console.log(this.tableData[row.index][column.property])
      // console.log(row[column['property']])
      // console.log(JSON.stringify(column))
      // console.log(JSON.stringify(cell))
      // console.log(JSON.stringify(event))
      this.$prompt(column.label, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: this.tableData[row.index][column.property]
      }).then(({ value }) => {
        this.tableData[row.index][column.property] = value
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    dateFormat (row, column) {
      const date = new Date(row[column.property])
      if (date === undefined) { return '' }
      return moment(date).format('YYYY-MM-DD')
    },
    InsertDataTable () {
      var that = this
      // console.log(JSON.stringify(that.tableData))
      if (that.tableData.length !== 0) {
        that.$.ajax({
          type: 'POST',
          url: that.api.baseURL + 'Import/Insert',
          contentType: 'application/json; charset=utf-8',
          data: JSON.stringify(that.tableData),
          dataType: 'JSON',
          success: function (response) {
            if (response.result === '导入成功') {
              that.$message({
                type: 'success',
                message: response.result
              })
              that.reload()
            } else {
              that.$message({
                type: 'error',
                message: response.result
              })
            }
          }
        })
      } else {
        that.$message({
          type: 'warning',
          message: '当前暂无数据'
        })
      }
    },
    GetDataTable () {
      this.tableData = null
      this.fileListUpload = []
      var that = this
      that.$.ajax({
        type: 'GET',
        url: that.api.baseURL + 'Import/GetAll',
        contentType: 'application/json; charset=utf-8',
        async: true,
        success: function (response) {
          that.tableData = response.result.items
          that.NOWTableType = '来自数据库'
        }
      })
    },
    OutTable () {
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        FileSaver.saveAs(
          // Blob 对象表示一个不可变、原始数据的类文件对象。
          // Blob 表示的不一定是JavaScript原生格式的数据。
          // File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          // 返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: 'application/octet-stream' }),
          // 设置导出文件名称
          (new Date().getMonth() + 1) + '月份.xlsx'
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    }
  },
  mounted () {
  }
}
</script>
