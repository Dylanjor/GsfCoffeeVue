<template>
<div>
  <!-- 总的用户table -->
  <el-select v-model="SelectValue" placeholder="请选择类别" @change ='parmTableData'>
    <el-option
      v-for="item in Options"
      :key="item.id"
      :label="item.typeName"
      :value="item.id" >
    </el-option>
  </el-select>
   <el-table :fit='true' :data="tableData" border stripe style="width: 100%">
      <el-table-column label="id" fixed prop="id" align="center" width="100"></el-table-column>
      <el-table-column label="名字" fixed prop="commodityName" align="center" width="250"></el-table-column>
      <el-table-column label="图片" prop="" align="center" width="200">
        <template slot-scope="scope">
          <img :src="scope.row.commImage" alt="" width="80%">
        </template>
      </el-table-column>
      <el-table-column label="售价" prop="sellingPrice" align="center" width="100" ></el-table-column>
      <el-table-column label="描述" prop="desc" align="center" width="250" > </el-table-column>
      <el-table-column label="注册时间" prop="createTime" align="center" :formatter="dateFormat" sortablealign="center" width="230"></el-table-column>
      <el-table-column fixed="right" width="150" align="center">
          <el-button size="mini">修改</el-button>
          <el-button size="mini" type="danger">删除</el-button>
      </el-table-column>
    </el-table>
</div>
</template>
<script lang="js">
import moment from 'element-ui'
import { Loading } from 'element-ui'
let loading;//loading的实例对象
let loadingCount = 0;
function start(){
　　loading = Loading.service({
　　　　lock:true,
　　　　text:'加载中..',
       target: document.querySelector('.el-table'),
　　　　background:'rgba(255,255,255,.4)'
　　})
};
function end(){
　　laoding.close();
}
function showLoaing(){
　　if( loadingCount==0){
　　　　start();
　　};
　　loadingCount++
};
function hideLoading(){
　　loadingCount--;
　　if(loadingCount==0){
      end()
　　}
}
export default({
  name: 'CommModity',
  data: function () {
    return {
      tableData: [],
      Options: [],
      SelectValue: '',
    }
  },
  methods: {
    startLoading (targetdq,isOpen) {
      let load
      if(isOpen == true)
        {
            load = Loading.service({
              lock: true,
              text: '努力加载中...',
              background: 'rgba(255,255,255,.4)',
              target: document.querySelector(targetdq) // 设置加载动画区域
          })
        }
        else{
          this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            load.close()
          });
        }
    },
    parmTableData () {
      var that = this
      // this.startLoading('.el-table',true)
      showLoaing()
      this.$.ajax({
        type: 'POST',
        url: that.api.baseURL + 'Commodity/GetAllComm',
        data:{ProdSpec:that.SelectValue},
        success: function (response) {
          that.tableData = response.result.items
          // that.startLoading('.el-table',false)
          hideLoading()
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
        }
      })
    },
    dateFormat: function (row, column) {
      var date = row[column.property]
      if (date === undefined) { return '' }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    dateFormat2: function (row, column) {
      var date = row[column.property]
      if (date === undefined) { return '' }
      return moment(date).format('YYYY-MM-DD')
    }
  },
  created () {
    this.parmOptions()
  },

})
</script>
