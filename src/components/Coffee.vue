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
            <li>我的账户</li>
            <li>菜单
              <ul>
                  <li><span>咖啡</span></li><li><span>美食</span></li><li><span>饮料</span></li><li><span>商品</span></li>
              </ul>
              </li>
          </ul>
          <!-- <img :src="coffeeface" width="100%"> -->
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
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <!-- <el-input type="textarea" v-model="form.desc"></el-input> -->
        <el-input :type="passw"  v-model="form.password" autocomplete="off">
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
          <el-date-picker type="date" placeholder="生日" v-model="form.date" style="width: 100%;"></el-date-picker>
        </el-col>
        <!-- <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
        </el-col> -->
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
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
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
        <el-form-item label="账号" prop="name">
          <el-input v-model="logform.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
        <el-input :type="logpassw"  v-model="logform.password" autocomplete="off">
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
export default{
  data () {
    return {
      flag: true,
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
      coffeeface: require('../picture/Coffee-Face.jpg'),
      listpic: [],
      form: {
        name: '',
        region: '',
        date: '',
        delivery: false,
        type: [],
        resource: '男',
        // desc: ''
        password: ''
      },
      logform: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 2 到 8 个字符', trigger: 'blur' }
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
          { required: true, type: 'password', message: '请输入密码', trigger: 'change' }
        ]
      },
      logrules: {
        name: [
          {required: true, message: '请输入账号', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    goCoffeeRegister () {
      // eslint-disable-next-line standard/object-curly-even-spacing
      this.$router.push({ name: 'Register'})
    },
    onload () {
      this.listpic =
       ['https://i1.fuimg.com/715304/395e39fc6dd0330a.png',
         'https://i1.fuimg.com/715304/a598958f4083fc17.jpg',
         'https://i1.fuimg.com/715304/40405d692956cfea.jpg',
         'https://i2.tiimg.com/715304/3d05a666162c5531.jpg',
         'https://i2.tiimg.com/715304/46ca868eb0fa445b.jpg',
         'https://i1.fuimg.com/715304/958f42f82a306944.jpg']
    },
    onSubmit () {
      console.log('submit!')
    },
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
    onlog () {
    // 登录
    }
  },
  mounted () {
    this.onload()
  }
}
</script>
