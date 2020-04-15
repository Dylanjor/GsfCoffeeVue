
<style>
@import url("../css/CoffeeDoor.css");
</style>
<template>
<div>
   <el-table
   :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    border
    stripe
    style="width: 100%">
    <el-table-column
      type="index"
      label="序号"
      fixed
      :index="indexMethod">
    </el-table-column>
    <el-table-column
      label="id"
      fixed
      prop="id"
      align="center"
      width="80">
    </el-table-column>
    <el-table-column
      label="名字"
      fixed
      prop="name"
      align="center"
      width="80">
    </el-table-column>
    <el-table-column
      label="密码"
      prop="passWord"
      align="center"
      width="80"
      >
    </el-table-column>
    <el-table-column
      label="性别"
      prop="resource"
      align="center"
      width="80"
      >
    </el-table-column>
    <el-table-column
      label="生日"
      prop="date"
      align="center"
      width="200"
      >
    </el-table-column>
    <el-table-column
      label="是否是会员"
      prop="delivery"
      align="center"
      width="100"
      >
    </el-table-column>
     <el-table-column
      label="爱好"
      prop="type"
        align="center"
      width="120"
      >
    </el-table-column>    
    <el-table-column
      label="注册时间"
      prop="createTime"
      sortable
      align="center"
      width="230">
    </el-table-column> 
    <el-table-column
      label="最近一次修改时间"
      prop="updateTime"
      sortable
      align="center"
      width="240"
       >
    </el-table-column> 
     <el-table-column
      label="电话"
      prop="tel"
      align="center"
      width="140"
      >
    </el-table-column>
    <el-table-column
      label="账号"    
      prop="numbering"
      align="center"
      width="140"
      >
    </el-table-column>  
    <el-table-column
      label="是否弃用"
      prop="deprecated"
      align="center"
      width="100"
      >
    </el-table-column>
    <el-table-column
      label="弃用时间"
      prop="deprecatedTime"
      align="center"
      width="100"
      >
    </el-table-column>
    <el-table-column
     fixed="right"
     width="150"
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
        @click="getshoppingDetails(scope.row)">购物</el-button>
       <el-button
        size="mini"
        type="danger"
        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>    

  </el-table>

  <el-dialog title="购物车" :visible.sync="dialogFormVisible">
  <el-table
    :data="this.gridData"
    stripe
     max-height="300"
    style="width: 100%">
    <el-table-column
      type="index"
      fixed
      width="50"
     align="center"
      :index="indexMethod">
    </el-table-column>
    <el-table-column
      label="商品ID"
      prop="commodityId"
      width="100"
      align="center">
    </el-table-column>
    <el-table-column
      label="数量"
      prop="qty"
      width="50"
      align="center">
    </el-table-column>
     <el-table-column
      label="创建时间"
      prop="createTime"
       width="200"
      align="center">
    </el-table-column> 
    <el-table-column
      label="是否已购买"
      prop="isBought"
      width="150"
      align="center">
    </el-table-column> 
    <el-table-column
      label="购买时间"
      prop="boughtTime"
      width="200"
      align="center">
    </el-table-column> 
     <el-table-column
      label="创建人"
      prop="founderId"
      width="100"
      align="center">
    </el-table-column> 
  <el-table-column
      fixed="right"
      width="100"
      align="center"
      label="操作"
     >
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
        <el-button type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
<div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button> 
</div>
  
</el-dialog>
</div>
</template>

<script>
export default {
    inject:["reload"],
    data() {
      return {
         gridData: [{   
          commodityId:'',    
          qty: '',
          createTime: '',
          isBought: '',
          boughtTime: '',
          founderId:''
        }],
        dialogTableVisible: false,
        dialogFormVisible: false,
        udpatedrawer:false,
        tableData: [{
        }],
        search: '',
        updateform: {
          id:'',
          name: '',
          region: '',
          date: '',
          delivery: false,
          password: '',
          type: [],
          resource: '',
          tel: ''
        },
      }
    },
    methods: {   
      insertfun(){
        var that = this
        this.$.ajax({
          type: 'POST',
          url: 'http://106.15.75.186:8080/api/services/app/GsfInit/GetAllasync',
          success: function (response) {           
            that.tableData = response.result.items            
          }          
        })        
      },
      getshoppingDetails(row) {
        this.dialogFormVisible=true;
        var that = this
        // alert(row.id);
        this.$.ajax({
          type: 'GET',
          url:'http://106.15.75.186:8080/api/services/app/ShoppingCart/GetShoppingByUserId?_UserId='+row.id ,
          success: function (response) {
            // alert(json.stringify(response))
            that.gridData = response.result.items 
          }
        })
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
     checkDetail(val){
       console.log(val)
    },  
  
    mounted(){
      this.insertfun()
    }
    
  }
</script>

