<style>
@import url("../css/CoffeeDoor.css");

</style>

<template>
  <el-container>
    <!--左侧不可滑动-->
    <div width="30%" class="cof-aside">
      <div class="cof-top" id="cof-Top">
        <img class="logo" :src="logopic">
        G S F
        <img class="menu" v-on:click= "flag=!flag,showldiv=!showldiv" :src="flag?menupic:crosspic">
        <!-- <i class="el-icon-s-operation,menu"></i> -->
      </div>
      <!--最初始的样子 淡入淡出-->
      <transition name="el-fade-in">
        <!-- <div class="cof-main-left" > -->
        <div class="cof-font" id="cof-Font" v-show="showldiv">
          惬意生活，来杯咖啡
          <br>
          <el-button icon="el-icon-user" type="primary" plain @click ="ltrdrawer = true">登录</el-button>
          <el-button icon="el-icon-edit" type="success" plain @click ="drawer = true">注册</el-button>
        </div>
      <!-- </div> -->
      </transition>
      <transition name="el-fade-in">
      <div class="cof-main-right" v-show="!showldiv">
          <ul class="ul-menu">
            <!-- <li>{{ this.sessionName }}</li> -->
            <li>菜单
              <ul>
                  <li><span>咖啡</span></li><li><span>美食</span></li><li><span>饮料</span></li><li><span>商品</span></li>
              </ul>
              </li>
          </ul>
      </div>
      </transition>
    </div>
  <!--右侧可滑动-->
    <el-main id="rightel" v-show="showmain">
      <!-- <el-main v-show="showmain"> -->
        <!--卡片走马灯-->
        <el-carousel :interval="4000" type="card">
          <el-carousel-item v-for="item in listpic" :key="item">
            <img :src='item' width="100%" height="100%">
          </el-carousel-item>
        </el-carousel>
        <div class="cof-main-featured">
          <div class="cof-main-featured-one"></div>
          <div class="cof-main-featured-two"></div>
          <div class="cof-main-featured-three"></div>
        </div>
        <div class="cof-main-Main">
          秋天的燕子<br>
          <font>
            燕子飞回来了秋天是不是要开始了
          </font>
        </div>
      <!-- </el-main> -->
    </el-main>
  <!-- 注册右侧出来 -->
    <el-drawer
      title="我是标题"
      direction="ltr"
      :visible.sync="drawer"
      :with-header="false">
      <el-form ref="form" :model="form" :rules="rules"  label-width="80px">
      <span class="cof-title">G S F</span>
      <el-form-item label="姓名" prop="name">
        <el-input v-model.trim="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <!-- <el-input type="textarea" v-model="form.desc"></el-input> -->
        <el-input :type="passw"  v-model.trim="form.password" autocomplete="off">
            <!-- input中加图标必须要有slot="suffix"属性，不然无法显示图标 -->
            <i slot="suffix" :class="icon" @click="showPass" ></i>
        </el-input>
      </el-form-item>
      <el-form-item label="性别" prop="resource">
        <el-radio-group v-model="form.resource">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生日" prop="date">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="生日" v-model="form.date" style="width: 100%;" :editable='false'></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="店面" prop="region">
        <el-select v-model="form.region" placeholder="店面选择">
          <el-option label="青岛" value="qingdao"></el-option>
          <el-option label="烟台" value="yantai"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="VIP" prop="delivery">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="爱好" prop="type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="咖啡" name="type"></el-checkbox>
          <el-checkbox label="奶茶" name="type"></el-checkbox>
          <el-checkbox label="书籍" name="type"></el-checkbox>
          <el-checkbox label="面包" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="loading">立即创建</el-button>
        <el-button @click="drawer=false">取消</el-button>
      </el-form-item>
    </el-form>
    </el-drawer>
    <el-drawer
    title="我是标题"
    direction="ltr"
    :visible.sync="ltrdrawer"
    :with-header="false">
      <el-form :model="logform" status-icon :rules="logrules" ref="logform" class="demo-ruleForm" label-width="80px">
        <span class="cof-title">G S F</span>
        <el-form-item label="账号" prop="numbering"
        :rules="[
          { required: true, message: '账号不能为空'},
          { type: 'number', message: '账号必须为数字值'}
        ]">
          <el-input type='numbering' v-model.number="logform.numbering" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
        <el-input :type="logpassw"  v-model.trim="logform.password" autocomplete="off">
            <i slot="suffix" :class="logicon" @click="showlogPass" ></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onlog">登录</el-button>
        <el-button @click="ltrdrawer=false">取消</el-button>
      </el-form-item>
      </el-form>
    </el-drawer>
  </el-container>
</template>
<script>
// 需要单独引用Message
import { Message } from 'element-ui'
export default{
  data () {
    // eslint-disable-next-line no-unused-vars
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    return {
      flag: true,
      loading: false,
      showldiv: true,
      showmain: true,
      drawer: false,
      ltrdrawer: false,
      passw: 'password',
      logpassw: 'password',
      icon: 'el-input__icon el-icon-view',
      logicon: 'el-input__icon el-icon-view',
      menupic: require('../picture/Menu.png'),
      crosspic: require('../picture/Cross.png'),
      logopic: require('../picture/coffeelogo.png'),
      listpic: [],
      sessionName: '',
      form: {
        name: '',
        region: '青岛',
        date: '',
        delivery: false,
        type: [],
        resource: '男',
        password: ''
      },
      logform: {
        name: '',
        numbering: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择店面', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: false, message: '生日可不填', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: false, message: '尽量选择一个爱好', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        password: [
          { required: true, validator: this.validatePass, message: '请输入密码', trigger: 'change' }
        ]
      },
      logrules: {
        password: [
          {validator: this.validatePass, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 跳转页面
    goCoffeeRegister () {
      // eslint-disable-next-line standard/object-curly-even-spacing
      this.$router.push({ name: 'Register'})
    },
    // 初始化
    onload () {
      this.listpic =
       ['https://i1.fuimg.com/715304/395e39fc6dd0330a.png',
         'https://i1.fuimg.com/715304/a598958f4083fc17.jpg',
         'https://i1.fuimg.com/715304/40405d692956cfea.jpg',
         'https://i2.tiimg.com/715304/3d05a666162c5531.jpg',
         'https://i2.tiimg.com/715304/46ca868eb0fa445b.jpg',
         'https://i1.fuimg.com/715304/958f42f82a306944.jpg']
    },
    // 注册提交
    onSubmit () {
      this.loading = true
      // eslint-disable-next-line no-unused-vars
      var that = this
      var registerParams = {
        'Name': that.form.name,
        'Region': that.form.region,
        'Date': that.form.date,
        'Delivery': that.form.delivery,
        'Type': that.form.type.join(), // 将数组转化为字符串join(),字符串转换为数组split(',')
        'Resource': that.form.resource,
        'PassWord': that.form.password,
        'Deprecated': false,
        'DeprecatedTime': ''
      }
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$.ajax({
            type: 'POST',
            url: 'http://106.15.75.186:8080/api/services/app/GsfInit/Register',
            data: JSON.stringify(registerParams),
            contentType: 'application/json',
            success: function (response) {
              that.$alert('您注册的ID是' + response.result + '。点击确定获取您登录用的账号', '注册成功', {
                confirmButtonText: '确定',
                callback: action => {
                  // eslint-disable-next-line no-unused-vars
                  that.$.ajax({
                    type: 'GET',
                    url: 'http://106.15.75.186:8080/api/services/app/GsfInit/GetByid?id=' + parseInt(response.result),
                    success: function (response) {
                      that.$message({
                        type: 'info',
                        message: `编号: ${response.result}`
                      })
                      that.$refs['form'].resetFields()
                      that.drawer = false
                      that.loading = false
                    }
                  })
                }
              })
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
              alert('XMLHttpRequest:' + XMLHttpRequest.status + ',textStatus:' + XMLHttpRequest.readyState + ',errorThrown:' + textStatus)
              that.loading = false
            }
          })
        } else {
          console.log('error submit!!')
          that.loading = false
          return false
        }
      })
    },
    // 显示注册密码
    showPass () {
      // 点击图标是密码隐藏或显示
      // eslint-disable-next-line eqeqeq
      if (this.passw == 'text') {
        this.passw = 'password'
        // 更换图标
        this.icon = 'el-input__icon el-icon-view'
      } else {
        this.passw = 'text'
        this.icon = 'el-input__icon el-icon-loading'
      };
    },
    // 显示登录的密码
    showlogPass () {
      // 点击图标是密码隐藏或显示
      // eslint-disable-next-line eqeqeq
      if (this.logpassw == 'text') {
        this.logpassw = 'password'
        // 更换图标
        this.logicon = 'el-input__icon el-icon-view'
      } else {
        this.logpassw = 'text'
        this.logicon = 'el-input__icon el-icon-loading'
      };
    },
    // 登录
    onlog () {
      // eslint-disable-next-line no-unused-vars
      var that = this
      var params = {
        'Num': that.logform.numbering, // 需要用Numbering来登录了
        'pwd': that.logform.password
      }
      this.$refs['logform'].validate((valid) => {
        if (valid) {
          this.$.ajax({
            type: 'POST',
            url: 'http://106.15.75.186:8080/api/services/app/GsfInit/Login',
            data: params,
            success: function (response) {
              var i = response.result.items
              if (i.length === 0) {
                Message.error('账号或者密码是错误的,请您再思考思考')
              } else {
                that.ltrdrawer = false
                that.showldiv = false
                that.flag = false
                that.sessionName = i[0].name
                if (i[0].resource === '男') {
                  Message({
                    message: '欢迎您' + i[0].name + '先生',
                    type: 'success'
                  })
                } else {
                  Message({
                    message: '欢迎您' + i[0].name + '女士',
                    type: 'success'
                  })
                }
              }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
              alert('XMLHttpRequest:' + XMLHttpRequest.status + ',textStatus:' + XMLHttpRequest.readyState + ',errorThrown:' + textStatus)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  // 延迟加载
  mounted () {
    // 延迟
    this.onload()
  }
}
</script>
