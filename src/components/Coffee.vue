<style>
@import url("../css/CoffeeDoor.css");

</style>

<template>
  <el-container>
  <!--左侧不可滑动-->
    <div width="30%" class="cof-aside">
      <div class="cof-top" id="cof-Top">
        <img class="logo" :src="logopic" @click="changemainright(0)">
        Coffee
        <img class="menu" v-on:click= "changeuser" :src="flag?menupic:crosspic">
        <!-- <i class="el-icon-s-operation,menu"></i> -->
      </div>
      <!--最初始的样子 淡入淡出-->
      <transition name="el-fade-in">
        <!-- <div class="cof-main-left" > -->
        <div class="cof-font" id="cof-Font" v-show="showldiv == 0">
          惬意生活，来杯咖啡
          <br>
          <el-button icon="el-icon-user" type="primary" plain @click ="ltrdrawer = true">登录</el-button>
          <el-button icon="el-icon-edit" type="success" plain @click ="drawer = true">注册</el-button>
        </div>
      <!-- </div> -->
      </transition>
      <transition name="el-fade-in">
        <!-- <div class="cof-main-left" > -->
        <div class="cof-font" v-show="showldiv == 1">
          账  号:{{this.sessionNum}}
          <br>
          用户名:{{this.sessionName}}
          <br>
        </div>
      <!-- </div> -->
      </transition>
      <transition name="el-fade-in">
      <div class="cof-main-right" v-show="showldiv == 2">
          <ul class="ul-menu">
            <!-- <li>{{ this.sessionName }}</li> -->
            <li>菜单
              <ul>
                  <li><i @click="changemainright(1)">咖啡</i></li>
                  <li><i @click="changemainright(2)">美食</i></li>
                  <li><i @click="changemainright(3)">饮料</i></li>
                  <li><i @click="changemainright(4)">商品</i></li>
              </ul>
              </li>
          </ul>
      </div>
      </transition>
    </div>
  <!--右侧可滑动-->
    <el-main id="rightel" v-show="this.showmain == 0" lazy>
      <!-- <el-main v-show="showmain"> -->
        <!--卡片走马灯-->
        <el-carousel :interval="4000" type="card">
          <el-carousel-item v-for="item in listpic" :key="item">
            <img :src='item' width="100%" height="100%">
          </el-carousel-item>
        </el-carousel>
        <div class="cof-main-Main">
          Coffee<br>
          <font>
            燕子飞回来了秋天是不是要开始了
          </font>
        </div>
        <div class="cof-main-Introduction">
          <!-- 网站简介 -->
          <el-steps :active="1" align-center>
            <el-step title="念头" description="刚开始有一些念头"></el-step>
            <el-step title="看书" description="初始了解咖啡的知识：咖啡豆主要出售阿拉比卡种和罗伯斯塔种"></el-step>
            <el-step title="体验" description="准备去往地点：青岛、烟台、上海、杭州、北京"></el-step>
            <el-step title="准备" description="确立装修风格与营销风格"></el-step>
          </el-steps>
        </div>
        <div class="cof-main-featured">
          <div class="cof-main-featured-one"></div>
          <div class="cof-main-featured-two"></div>
          <div class="cof-main-featured-three"></div>
        </div>
        <el-divider content-position="left">Coffee</el-divider>
        <div class="cof-main-big-img">
          <!-- <font>活动介绍</font> -->
        </div>
    </el-main>
    <el-main id="rightcoffee" v-show="this.showmain == 1">
      <!-- 加个图片 -->
        <img :src="coffeelistbigimg" width="100%">
        <div class="rightcoffee-Cherry-blossoms">
          <span>早樱初绽</span><br>
          <font>早樱初绽的美好时节怎能错过。浓醇咖啡交织淡雅樱花般的清香，绵密奶泡与樱花风味酱
          协奏出丝绒般口感，这一杯饱满而清甜不腻的樱花初绽玛奇朵，带来樱花初绽般的清新典
          雅。而樱花初绽抹茶拿铁樱花般的清香包裹柔滑白巧克力般甜香搭配纯正抹茶，像初春的
          新叶陪衬粉嫩的花苞，尽享此刻樱开。</font>
        </div>
      <!-- 选择性卡片 -->
        <div class="block">
          <div class="block-left">
            <ul>
              <!--  -->
              <li class="block-left-one" style="background:white" v-if="changecoffeelistpic==0">
                  <font>小燕子系列</font><br>
                  <font style="font-size:10px;color:gray">Swallow Coffee</font>
              </li>
              <li class="block-left-one" @click="changecoffeelistpicf(0)" v-if="changecoffeelistpic!=0">
                  <font>小燕子系列</font><br>
                  <font style="font-size:10px;color:gray">Swallow Coffee</font>
              </li>
              <!--  -->
              <li class="block-left-one" style="background:white" v-if="changecoffeelistpic==1">
                  <font>小松鼠系列</font><br>
                  <font style="font-size:10px;color:gray">Squirrel Coffee</font>
              </li>
              <li class="block-left-one" @click="changecoffeelistpicf(1)" v-if="changecoffeelistpic!=1">
                  <font>小松鼠系列</font><br>
                  <font style="font-size:10px;color:gray">Squirrel Coffee</font>
              </li>
              <!--  -->
              <li class="block-left-one" style="background:white" v-if="changecoffeelistpic==2">
                  <font>老鹰系列</font><br>
                  <font style="font-size:10px;color:gray">Eagle Coffee</font>
              </li>
              <li class="block-left-one" @click="changecoffeelistpicf(2)" v-if="changecoffeelistpic!=2">
                  <font>老鹰系列</font><br>
                  <font style="font-size:10px;color:gray">Eagle Coffee</font>
              </li>
              <!--  -->
              <li class="block-left-one" style="background:white" v-if="changecoffeelistpic==3">
                  <font>老虎系列</font><br>
                  <font style="font-size:10px;color:gray">Tigle Coffee</font>
              </li>
              <li class="block-left-one" @click="changecoffeelistpicf(3)" v-if="changecoffeelistpic!=3">
                  <font>老虎系列</font><br>
                  <font style="font-size:10px;color:gray">Tigle Coffee</font>
              </li>
            </ul>
          </div>
          <el-carousel v-show="changecoffeelistpic==0">
            <el-carousel-item v-for="item in coffeelistpic" :key="item">
              <img :src="item" width="100%" height="100%">
            </el-carousel-item>
          </el-carousel>
          <el-carousel v-show="changecoffeelistpic==1">
            <el-carousel-item v-for="item in coffeelistpictwo" :key="item">
              <img :src="item" width="100%" height="100%">
            </el-carousel-item>
          </el-carousel>
          <el-carousel v-show="changecoffeelistpic==2">
            <el-carousel-item v-for="item in coffeelistpicthree" :key="item">
              <img :src="item" width="100%" height="100%">
            </el-carousel-item>
          </el-carousel>
          <el-carousel v-show="changecoffeelistpic==3">
            <el-carousel-item v-for="item in coffeelistpicfour" :key="item">
              <img :src="item" width="100%" height="100%">
            </el-carousel-item>
          </el-carousel>
        </div>
      <!-- allCoffee -->
        <el-divider content-position="left">All-Coffee</el-divider>
        <div class="rightcoffee-all-coffee">
          <font>所有新品</font>
          <div class="rightcoffee-all-coffee-block" v-for="fit in urlallcoffee" :key="fit.name">
            <span class="demonstration">{{ fit.name }}</span>
            <el-image
              style="width: 100px; height: 100px"
              :src="fit.url"
              :fit="'contain'"></el-image>
          </div>
        </div>
    </el-main>
    <el-main id="rightmeishi" v-show="this.showmain == 2">
      meishi
    </el-main>
    <el-main id="rightyinliao" v-show="this.showmain == 3">
      yinliao
    </el-main>
    <el-main id="rightshangpin" v-show="this.showmain == 4">
      shangpin
    </el-main>
  <!-- 注册和登录右侧出来 -->
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
          <el-option label="青岛" value="青岛"></el-option>
          <el-option label="烟台" value="烟台"></el-option>
          <el-option label="杭州" value="杭州"></el-option>
          <el-option label="上海" value="上海"></el-option>
          <el-option label="北京" value="北京"></el-option>
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
      showldiv: 0,
      showmain: 0,
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
      sessionNum: '',
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
      },
      coffeelistpic: [],
      coffeelistpictwo: [],
      coffeelistpicthree: [],
      coffeelistpicfour: [],
      urlallcoffee: [],
      coffeelistbigimg: 'https://i2.tiimg.com/715304/6c23b5c2514c989d.png',
      changecoffeelistpic: 0
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
      this.coffeelistpic = [
        'https://i2.tiimg.com/715304/9bd7366ed88a3aee.jpg',
        'https://i2.tiimg.com/715304/479c5aaca7818f49.jpg',
        'https://i2.tiimg.com/715304/87fb69f67e512da1.jpg'
      ]
      this.coffeelistpictwo = [
        'https://i2.tiimg.com/715304/5dde0fd0b012c5fc.jpg',
        'https://i2.tiimg.com/715304/e686ac376e496800.jpg',
        'https://i2.tiimg.com/715304/f6a2acf22b044f58.jpg',
        'https://i2.tiimg.com/715304/a184eefa1554259b.jpg'
      ]
      this.coffeelistpicthree = [
        'https://i2.tiimg.com/715304/5dde0fd0b012c5fc.jpg',
        'https://i2.tiimg.com/715304/e686ac376e496800.jpg',
        'https://i2.tiimg.com/715304/f6a2acf22b044f58.jpg',
        'https://i2.tiimg.com/715304/479c5aaca7818f49.jpg',
        'https://i2.tiimg.com/715304/87fb69f67e512da1.jpg'
      ]
      this.coffeelistpicfour = [
        'https://i2.tiimg.com/715304/5dde0fd0b012c5fc.jpg',
        'https://i2.tiimg.com/715304/e686ac376e496800.jpg',
        'https://i2.tiimg.com/715304/f6a2acf22b044f58.jpg',
        'https://i2.tiimg.com/715304/0366cd1b09a68981.jpg',
        'https://i2.tiimg.com/715304/479c5aaca7818f49.jpg',
        'https://i2.tiimg.com/715304/87fb69f67e512da1.jpg'
      ]
      this.urlallcoffee = [
        {'name': '樱花初绽玛奇朵', url: 'https://i1.fuimg.com/715304/0e12a7e51b0ee459.png'},
        {'name': '樱花初绽抹茶', url: 'https://i1.fuimg.com/715304/c3b1f360654e969b.png'},
        {'name': '樱花初绽抹茶拿铁', url: 'https://i1.fuimg.com/715304/f8d739e39d9cdb37.png'},
        {'name': '落樱飘雪冷萃', url: 'https://i1.fuimg.com/715304/c320a11e081c9c01.png'},
        {'name': '春茶牛乳蛋糕', url: 'https://i1.fuimg.com/715304/0c86864eb80438ef.png'},
        {'name': '盛樱蛋糕（树莓风味）', url: 'https://i1.fuimg.com/715304/e7e6a5b12584e041.png'},
        {'name': '粉樱乳酪卷（草莓味）', url: 'https://i1.fuimg.com/715304/c9622e3260d8596d.png'},
        {'name': '星巴克®春意礼赞综合咖啡豆', url: 'https://i1.fuimg.com/715304/c3b1f360654e969b.png'},
        {'name': '星巴克®单一产地系列苏拉维西托拉贾咖啡豆', url: 'https://i1.fuimg.com/715304/444db2fdad7d3300.png'},
        {'name': '星巴克臻选™肯尼亚 芭拉吉山 咖啡豆', url: 'https://i1.fuimg.com/715304/abb7438baefaabba.png'},
        {'name': '星巴克臻选™卢旺达 穆洪多咖啡豆', url: 'https://i1.fuimg.com/715304/37759ffb14ba256f.png'},
        {'name': '星巴克臻选™巴西 加利福尼亚庄园', url: 'https://i1.fuimg.com/715304/807b21584fd6a8f5.png'},
        {'name': '星巴克臻选™日晒埃塞俄比亚 耶加雪菲 雪冽图咖啡豆', url: 'https://i1.fuimg.com/715304/e7a768a853da2812.png'},
        {'name': '17oz樱花小鹿款冷饮玻璃杯', url: 'https://i1.fuimg.com/715304/2473fb44c177c0fe.png'},
        {'name': '12oz粉色野餐水球造型随行杯', url: 'https://i1.fuimg.com/715304/71f38cc9ebf7bcd7.png'},
        {'name': '14oz萌猫樱花款茶漏配玻璃杯', url: 'https://i1.fuimg.com/715304/1702b61ec95d1f65.png'},
        {'name': '12oz樱花躲猫猫款双层马克杯', url: 'https://i1.fuimg.com/715304/f2991501d6cdc31f.png'}
      ]
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
                      that.sessionName = that.form.name
                      that.sessionNum = response.result
                      that.$refs['form'].resetFields()
                      that.drawer = false
                      that.loading = false
                      that.showldiv = 1
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
                that.showldiv = 1
                that.sessionNum = i[0].numbering
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
    },
    // 改变页面信息从登录
    changeuser () {
      this.flag = !this.flag
      if (this.showldiv === 0 && this.sessionName === '') {
        this.showldiv = 2
      } else if (this.showldiv === 2 && this.sessionName === '') {
        this.showldiv = 0
      } else if (this.showldiv === 2 && this.sessionName !== '') {
        this.showldiv = 1
      } else if (this.showldiv === 1) {
        this.showldiv = 2
      }
    },
    changemainright (event) {
      this.showmain = event
    },
    changecoffeelistpicf (event) {
      this.changecoffeelistpic = event
    }
  },
  // 延迟加载
  mounted () {
    // 延迟
    this.onload()
  }
}
</script>
